import { authOptions } from './auth'
import { getServerSession } from "next-auth/next"

//for api routes
export const getSession = async () => {
    return await getServerSession(authOptions)
}