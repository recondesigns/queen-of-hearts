'use client'
import React from 'react'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
  const {selectedEnvelope, togglePicked} = useEnvelopeStore()
  const [cardValue, setCardValue] = React.useState<string>('')
  const [cardName, setCardName] = React.useState<string>('')
  const [cardSuit, setCardSuit] = React.useState<string>('')

  const handleSuitSelectChange = (e: SelectChangeEvent) => {
    setCardSuit(e.target.value)
  }

  const handleSaveCardUpdate = () => {
    togglePicked(selectedEnvelope.id, true, cardName, cardSuit, cardValue)
    setCardValue('')
    setCardName('')
    setCardSuit('')
    onClose()
  }

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
            <InputLabel id="suit-select-label">Suit</InputLabel>
            <Select
              labelId="suit-select-label"
              id="suit-select"
              value={cardSuit}
              onChange={handleSuitSelectChange}
            >
              <MenuItem value={'clubs'}>Clubs</MenuItem>
              <MenuItem value={'diamonds'}>Diamonds</MenuItem>
              <MenuItem value={'hearts'}>Hearts</MenuItem>
              <MenuItem value={'spades'}>Spades</MenuItem>
            </Select>
            <InputLabel id="card-name-label">Name</InputLabel>
            <TextField
              id="card-name"
              variant="outlined"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <InputLabel id="card-value-label">Value</InputLabel>
            <TextField
              id="card-value"
              variant="outlined"
              value={cardValue}
              onChange={(e) => setCardValue(e.target.value)}
            />
          </Box>
          <Button variant={'contained'} onClick={handleSaveCardUpdate}>Save value</Button>
          <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateCardModal