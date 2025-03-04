'use client'
import React from 'react'
import {useDisplayControlsStore} from "@/stores/displayControlsStore";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const DisplayControls = ({ }) => {
  const {setShow} = useDisplayControlsStore()

  return (
    <Box pt={2} pb={2}>
      <Button variant={'contained'} onClick={() => setShow('picked')}>Show picked</Button>
      <Button variant={'contained'} onClick={() => setShow('unpicked')}>Show unpicked</Button>
      <Button variant={'contained'} onClick={() => setShow('all')}>Show all</Button>
    </Box>
  )
}

export default DisplayControls