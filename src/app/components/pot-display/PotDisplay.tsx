'use client'
import React from 'react'
import Typography from '@mui/material/Typography'

export type PotDisplayProps = {
  potValue: number;
}

const PotDisplay = ({potValue}: PotDisplayProps) => {
  return (
    <>
      <Typography variant={'body1'}>{!potValue ? 'Loading...' : `$${potValue.toLocaleString()}`}</Typography>
    </>
  )
}

export default PotDisplay