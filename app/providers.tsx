
'use client'
import {NextUIProvider} from "@nextui-org/react";
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Providers = ({children}: {children: React.ReactNode}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </NextUIProvider>
  )
}

export default Providers
