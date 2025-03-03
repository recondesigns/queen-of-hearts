'use client'
import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <p>This is a modal</p>
          <Button variant={'contained'} onClick={onClose}>Close modal</Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdatePotValueModal