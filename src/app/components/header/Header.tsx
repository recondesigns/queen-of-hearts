'use client'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useAuthStore } from "@/stores/authStore";
import Button from '@mui/material/Button'

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // border: '2px solid orange'
}

export default function Header() {
  const { user, loading, logout } = useAuthStore()
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User logged out.')
      router.push('/')
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <header style={headerStyles}>
      <p>Queen of Hearts</p>
      <Button variant='contained' onClick={!user ? handleSignIn : handleSignOut}>{!user ? 'Sign in' : 'Sign out'}</Button>
    </header>
  )
}