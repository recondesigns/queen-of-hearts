'use client'
import React from 'react'
import {auth} from "@/lib/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useLogInStore} from "@/stores/logInStore";
import {useRouter} from 'next/navigation';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LogInForm = () => {
  const {email, password, error, setEmail, setPassword, setError} = useLogInStore()
  const router = useRouter()
  console.log(111, password)

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch(err) {
      setError('Invalid email or password.')
      console.error("Log in unsuccessful.", err)
    }
  }

  return (
    <Box
      component={'form'}
      pb={2}
      // sx={{border: '2px solid orange'}}
    >
      <Typography variant={'h5'} pb={2} sx={{fontWeight: 'bold'}}>Log in</Typography>
      <Box
        gap={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
      }}
      >
        <TextField
          label={'Email'}
          type={'email'}
          value={email}
          size={'small'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          label={'Password'}
          type={'password'}
          value={password}
          size={'small'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </Box>
        {error && <p>{error}</p>}
      <Box pt={2}>
        <Button variant={'contained'} type={'button'} fullWidth onClick={handleLogin}>Log in</Button>
      </Box>

      {/*<form style={{display: 'flex', flexDirection: 'column'}}>*/}
      {/*  <label>Email</label>*/}
      {/*  <input value={email} onChange={e => setEmail(e.target.value)}/>*/}
      {/*  <label>Password</label>*/}
      {/*  <input value={password} onChange={e => setPassword(e.target.value)}/>*/}
      {/*  <button type='button' onClick={handleLogin}>Submit</button>*/}
      {/*  {error && <p>{error}</p>}*/}
      {/*</form>*/}
    </Box>
  )
}

export default LogInForm