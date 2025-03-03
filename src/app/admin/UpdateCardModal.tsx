'use client'
import React from 'react'
import {useEnvelopeStore} from "@/stores/envelopeStore";
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

const UpdateCardModal = ({open, onClose}: UpdatePotValueModalProps) => {
  const {selectedEnvelope} = useEnvelopeStore()

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          {selectedEnvelope && (<p>{`Updating envelope: ${selectedEnvelope.number}`}</p>)}
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
            />
          </Box>
          <Button variant={'contained'}>Save value</Button>
          <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateCardModal