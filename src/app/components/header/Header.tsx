'use client'
import {auth} from '@/lib/firebase'
import {signOut} from 'firebase/auth'
import {useRouter} from 'next/navigation'
import {useAuthStore} from "@/stores/authStore";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Header() {
  const {user} = useAuthStore()
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User logged out.')
      router.push('/')
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <Box component={'header'} py={2} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
      <Typography variant={'h5'} component={'p'} sx={{fontWeight: 'bold'}}>Queen of Hearts</Typography>
      {user && (
        <Button
          variant='outlined'
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      )}
    </Box>
  )
}