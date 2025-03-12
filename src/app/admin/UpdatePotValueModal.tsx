'use client'
import React from 'react'
import {usePotValueStore} from "@/stores/potValueStore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

type UpdatePotValueModalProps = {
  open: boolean;
  onClose: () => void;
}

const UpdatePotValueModal = ({open, onClose}: UpdatePotValueModalProps) => {
  const {updatePotValue} = usePotValueStore()
  const [newValue, setNewValue] = React.useState<number | null>(null)

  const handleNewValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error Argument of type string is not assignable to parameter of type SetStateAction<number | null>
    setNewValue(e.target.value)
  }

  const handleSavePotValue = () => {
    // TODO: find out why it is saying this is ignoring a promise that is being returned
    // @ts-expect-error Argument of type number | null is not assignable to parameter of type number
    updatePotValue(newValue)
    setNewValue(null)
    onClose()
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
          <Button variant={'contained'} onClick={handleSavePotValue}>Save value</Button>
          <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdatePotValueModal