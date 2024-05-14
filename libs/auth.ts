import bcrypt from "bcrypt"
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from 'next-auth/providers/google'

import prisma from '@/libs/prismadb'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({ 
      id:'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) : Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please fill out all fields")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
            throw new Error("Email not found")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
            throw new Error("Incorrect password")
        }
        return user;
      }
    }
    ),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      // Redirect to the provided callback URL if it is a sign-out operation
      else if (url.includes('/sign-out')) return '/sign-in';

      else if (url.includes('/sign-in') || url.includes('/register')) return '/';
      // Fallback to the base URL
      return baseUrl;
    },
    async signIn({account, profile, user}) {
      // console.log(account?.provider, profile, user)
  
        const email = user.email;
        const existingUser = await prisma.user.findFirst({
                where: {email: email || ''}
            })
            if (!existingUser) {
              try {
                      const newUser = await prisma.user.create({
                      data: {
                          email: user.email || '',
                          name:user.name     
                      }
                  })   

              } catch (error) {
                  throw new Error('Failed to create a new user');
              }
          } 
    
     
      return true
    },
    async jwt({token, user})
    {
       
        if(user)
        {
            return {
                ...token,
                id: user.id,
            }
        }
        return token;
    },
  },
  
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  pages:{
    'signIn':'/sign-in'
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET,
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}