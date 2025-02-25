'use client'
import React from 'react'
import { useAuthStore} from "@/stores/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  React.useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <>
      {children}
    </>
  )
}