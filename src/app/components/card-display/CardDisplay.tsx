'use client'
import React from 'react'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import {useDisplayControlsStore} from "@/stores/displayControlsStore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import cardMap from "@/lib/cardsMap";
import Typography from "@mui/material/Typography";
import UpdateCardModal from "@/app/admin/UpdateCardModal";
import DisplayControls from "@/app/components/display-controls/DisplayControls";
import {IconType} from "react-icons";
import {Envelope} from '../../../stores/envelopeStore'

const convertSuit = (suit: string) => {
  switch (suit) {
    case 'clubs':
      return 'C'
    case 'diamonds':
      return 'D'
    case 'hearts':
      return 'H'
    case 'spades':
      return 'S'
    default:
      return null
  }
}

const setCardIdentifier = (value: string, suit: string) => `${value}${convertSuit(suit)}`

type CardDisplayProps = {
  isAdmin?: boolean;
  envelopes: Envelope[];
}

const CardDisplay = ({envelopes, isAdmin}: CardDisplayProps) => {
  const {setSelectedEnvelope} = useEnvelopeStore()
  const {show} = useDisplayControlsStore()
  const [isUpdateCardModalOpen, setIsUpdateCardModalOpen] = React.useState<boolean>(false)

  const handleEnvelopeClick = (pickedEnvelope: Envelope) => {
    setIsUpdateCardModalOpen(true)
    setSelectedEnvelope(pickedEnvelope)
  }

  const envelopesToDisplay = show === 'all' ? envelopes : show === 'picked' ? envelopes.filter(envelope => envelope.isPicked) : envelopes.filter(envelope => !envelope.isPicked)

  return (
    <Box>
      <UpdateCardModal open={isUpdateCardModalOpen} onClose={() => setIsUpdateCardModalOpen(false)}/>
      <Box>
        <DisplayControls/>
        <Grid
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            rowGap: '20px',
            columnGap: '12px',
          }}
        >
          {/* @ts-expect-error  TS18048: a. number is possibly undefined*/}
          {envelopesToDisplay.sort((a, b) => a.number - b.number).map((envelope, idx: number) => {
            // @ts-expect-error Element implicitly has an any type because expression of type string can't be used to index type
            const Icon: IconType = cardMap[setCardIdentifier(envelope.value, envelope.suit)] || null

            const getCardColor = (string: string) => (string.endsWith('C') || string.endsWith('S') ? 'black' : 'red')

            return (
              <Box key={idx}>
                {isAdmin ? (
                  <Box
                    sx={{
                      // paddingBottom: '12px',
                      background: '#fff',
                      // borderBottom: '2px solid #ddd',
                    }}
                    onClick={() => handleEnvelopeClick(envelope)}
                  >
                    <Typography variant='h6' sx={{textAlign: 'center', borderBottom: '2px solid #ddd'}}>{envelope.number}</Typography>
                    <Box pt={1} sx={{height: '56px'}}>
                      {envelope.isPicked && <p style={{
                        margin: '0px',
                        padding: '0px',
                        fontSize: '56px',
                        lineHeight: '56px',
                        textAlign: 'center',
                      }}>
                        {/* @ts-expect-error Argument of type string | undefined is not assignable to parameter of type string*/}
                        {<Icon color={getCardColor(setCardIdentifier(envelope.value, envelope.suit))}/>}</p>
                      }
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      paddingBottom: '12px',
                      background: '#fff',
                      borderBottom: '2px solid #ddd',
                    }}
                  >
                    <Typography variant='h6' sx={{textAlign: 'center'}}>{envelope.number}</Typography>
                    <Box sx={{padding: '0px', margin: '0px', height: '56px'}}>
                      {envelope.isPicked && <p style={{
                        margin: '0px',
                        padding: '0px',
                        fontSize: '56px',
                        lineHeight: '56px',
                        textAlign: 'center',
                      }}>
                        {/* @ts-expect-error Argument of type string | undefined is not assignable to parameter of type string*/}
                        {<Icon color={getCardColor(setCardIdentifier(envelope.value, envelope.suit))}/>}</p>
                      }
                    </Box>
                  </Box>
                )}
              </Box>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default CardDisplay