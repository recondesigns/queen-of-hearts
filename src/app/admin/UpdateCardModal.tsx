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
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
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

  const handleValueSelectChange = (e: SelectChangeEvent) => {
    setCardValue(e.target.value)
  }

  const handleSaveCardUpdate = () => {
    // @ts-expect-error selectedEnvelope is possibly null
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
            // '& > :not(style)': { m: 1, width: '25ch' }
            sx={{width: '100%', }}
            noValidate
            autoComplete="off"
          >
            <Box
              sx={{ display: 'flex', gap: 2}}
            >
              <Box sx={{ width: '100%'}}>
                <InputLabel id="suit-select-label">Suit</InputLabel>
                <Select
                  labelId="suit-select-label"
                  id="suit-select"
                  value={cardSuit}
                  onChange={handleSuitSelectChange}
                  sx={{width: '100%'}}
                >
                  <MenuItem value={'clubs'}>Clubs</MenuItem>
                  <MenuItem value={'diamonds'}>Diamonds</MenuItem>
                  <MenuItem value={'hearts'}>Hearts</MenuItem>
                  <MenuItem value={'spades'}>Spades</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: '100%'}}>
                <InputLabel id="value-select-label">Value</InputLabel>
                <Select
                  labelId="value-select-label"
                  id="value-select"
                  value={cardValue}
                  onChange={handleValueSelectChange}
                  sx={{width: '100%'}}
                >
                  <MenuItem value={'A'}>Ace</MenuItem>
                  <MenuItem value={'2'}>Two</MenuItem>
                  <MenuItem value={'3'}>Three</MenuItem>
                  <MenuItem value={'4'}>Four</MenuItem>
                  <MenuItem value={'5'}>Five</MenuItem>
                  <MenuItem value={'6'}>Six</MenuItem>
                  <MenuItem value={'7'}>Seven</MenuItem>
                  <MenuItem value={'8'}>Eight</MenuItem>
                  <MenuItem value={'9'}>Nine</MenuItem>
                  <MenuItem value={'10'}>Ten</MenuItem>
                  <MenuItem value={'J'}>Jack</MenuItem>
                  <MenuItem value={'Q'}>Queen</MenuItem>
                  <MenuItem value={'K'}>King</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ pt: 2, width: '100%'}}>
              <InputLabel id="card-name-label">Name</InputLabel>
              <TextField
                id="card-name"
                variant="outlined"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                sx={{width: '100%'}}
              />
            </Box>
          </Box>
          <Box pt={4} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2}}>
            <Button variant={'contained'} onClick={handleSaveCardUpdate}>Assign card</Button>
            <Button variant={'outlined'} onClick={onClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateCardModal