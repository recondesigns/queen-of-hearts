'use client'
import React from 'react'
import {useDisplayControlsStore} from "@/stores/displayControlsStore";
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

const DisplayControls = ({}) => {
  const {show, setShow} = useDisplayControlsStore()

  const handleShowSelectChange = (e: SelectChangeEvent) => {
    // @ts-expect-error Argument of type string is not assignable to parameter of type "all" | "picked" | "unpicked
    setShow(e.target.value)
  }

  return (
    <Box pt={2} pb={4}>
      <Box>
        <InputLabel id="display-filter-select-label">Show only</InputLabel>
        <Select
          labelId="display-filter-select-label"
          id="display-filter-select"
          value={show}
          onChange={handleShowSelectChange}
          sx={{width: '100%'}}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'picked'}>Picked</MenuItem>
          <MenuItem value={'unpicked'}>Unpicked</MenuItem>
        </Select>
      </Box>
    </Box>
  )
}

export default DisplayControls