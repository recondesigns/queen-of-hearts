'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import {auth} from '@/lib/firebase'
// import {signOut} from 'firebase/auth'
// import {useRouter} from 'next/navigation'
// import {useAuthStore} from "@/stores/authStore";

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export default function Header() {
  // const {user} = useAuthStore()
  // const router = useRouter()

  // const handleSignOut = () => {
  //   signOut(auth).then(() => {
  //     console.log('User logged out.')
  //     router.push('/')
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }

  // const handleSignIn = () => {
  //   router.push('/login')
  // }

  return (
    <Box component={'header'} style={headerStyles}>
      <Typography variant={'h5'} component={'p'} sx={{fontWeight: 'bold'}}>Queen of Hearts</Typography>
    </Box>
  )
}