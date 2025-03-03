'use client'
import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type UpdatePotValueModalProps = {
  open: boolean;
  onClose: () => void;
}

const UpdatePotValueModal = ({open, onClose}: UpdatePotValueModalProps) => {
  const [newValue, setNewValue] = React.useState<number | null>(null)

  const handleNewValueChange = (e) => {
    setNewValue(e.target.value)
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <p>This is a modal</p>
          <Box
            component={'form'}
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="new-value"
              label="New value"
              variant="outlined"
              type={'number'}
              value={newValue}
              onChange={handleNewValueChange}
            />
          </Box>
          <Button variant={'contained'}>Save value</Button>
          <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdatePotValueModal