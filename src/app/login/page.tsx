'use client'
import React from 'react'
import LogInForm from './LogInForm'
import Box from '@mui/material/Box'

export default function LoginPage() {
  return (
    <Box
      component={'main'}
      px={{xs: 2, md: 4, lg: 6}}
    >
      <Box component={'section'}>
        <LogInForm />
      </Box>
    </Box>
  )
}