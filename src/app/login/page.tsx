'use client'
import React from 'react'
import LogInForm from './LogInForm'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

export default function LoginPage() {
  return (
    <Box
      component={'main'}
      px={{xs: 2, md: 4, lg: 6}}
    >
      <Box
        component={'section'}
        py={20}
      >
        <Grid container sx={{ justifyContent: 'center'}}>
          <Grid size={{xs: 8, sm: 6, md: 4, lg: 3}}>
            <LogInForm />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}