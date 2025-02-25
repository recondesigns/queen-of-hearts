'use client'
import React from 'react'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { useAuthStore} from "@/stores/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  React.useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <>
      {/*<AppRouterCacheProvider>*/}
        {children}
      {/*</AppRouterCacheProvider>*/}
    </>
  )
}