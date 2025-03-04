'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type PotDisplayProps = {
  potValue: number;
}

const PotDisplay = ({potValue}: PotDisplayProps) => {
  return (
    <Box pb={2}>
      <Typography
        variant={'h4'}
        pb={1}
        sx={{
        fontWeight: 'bold',
        textAlign: 'center'
      }}>{!potValue ? 'Loading...' : `$${Number(potValue).toLocaleString()}`}</Typography>
      <Typography variant={'body2'} sx={{
        fontWeight: 200,
        textAlign: 'center'
      }}>Wednesday, March 5th | 7:30 p.m.</Typography>
    </Box>
  )
}

export default PotDisplay