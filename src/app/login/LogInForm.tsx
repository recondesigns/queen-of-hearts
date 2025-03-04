'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LogInForm = () => {
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
          size={'small'}
          type={'email'}
        />
        <TextField
          label={'Password'}
          size={'small'}
          type={'password'}
        />
      </Box>
      <Box pt={2}>
        <Button variant={'contained'} fullWidth>Log in</Button>
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