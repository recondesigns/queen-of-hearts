'use client'
import React from 'react'
import {usePotValueStore} from "@/stores/potValueStore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  borderRadius: '6px'
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
          <Typography variant={'h6'}>Update pot value</Typography>
          <Box
            pt={2}
            component={'form'}
            // sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            // sx={{border: '2px solid orange'}}
          >
            <TextField
              id="new-value"
              label="New value"
              variant="outlined"
              type={'number'}
              value={newValue}
              onChange={handleNewValueChange}
              sx={{
                width: '100%'
              }}
            />
          </Box>
          <Box
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2
            }}
            // sx={{
            //   border: '2px solid orange'
            // }}
          >
            <Button variant={'contained'} onClick={handleSavePotValue}>Save value</Button>
            <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default UpdatePotValueModal