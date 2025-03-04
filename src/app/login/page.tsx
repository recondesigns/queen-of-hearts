'use client'
import React from 'react'
import LogInForm from './LogInForm'
import Box from '@mui/material/Box'

export default function LoginPage() {
  return (
    <Box component={'main'}>
      <Box component={'section'}>
        <LogInForm />
      </Box>
    </Box>
  )
}