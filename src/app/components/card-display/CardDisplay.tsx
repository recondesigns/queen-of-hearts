'use client'
import React from 'react'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import {useDisplayControlsStore} from "@/stores/displayControlsStore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {IconType} from "react-icons";
import cardMap from "@/lib/cardsMap";
import Typography from "@mui/material/Typography";
import { Envelope } from '../../../stores/envelopeStore'
import UpdateCardModal from "@/app/admin/UpdateCardModal";
import DisplayControls from "@/app/components/display-controls/DisplayControls";

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

const CardDisplay = ({envelopes,  isAdmin}: CardDisplayProps) => {
  const {setSelectedEnvelope} = useEnvelopeStore()
  const {show} = useDisplayControlsStore()
  const [isUpdateCardModalOpen, setIsUpdateCardModalOpen] = React.useState<boolean>(false)

  const handleEnvelopeClick = (pickedEnvelope: Envelope) => {
    setIsUpdateCardModalOpen(true)
    setSelectedEnvelope(pickedEnvelope)
  }

  const envelopesToDisplay = show === 'all' ? envelopes : show === 'picked' ? envelopes.filter(envelope => envelope.isPicked) : envelopes.filter(envelope => !envelope.isPicked)
  // const pickedEnvelopes = envelopes.filter(envelope => envelope.isPicked);
  console.log(show)

  return (
    <>
      <UpdateCardModal open={isUpdateCardModalOpen} onClose={() => setIsUpdateCardModalOpen(false)} />
      <Box>
        <Grid size={12}>
          <DisplayControls />
        </Grid>
        <Grid container spacing={2}>
          {/* @ts-expect-error a. number is possibly undefined */}
          {envelopesToDisplay.sort((a, b) => a.number - b.number).map((envelope, idx) => {
            // @ts-expect-error Element implicitly has an any type because expression of type string can't be used to index type
            const Icon: IconType = cardMap[setCardIdentifier(envelope.value, envelope.suit)] || null

            const getCardColor = (string: string) => (string.endsWith('C') || string.endsWith('S') ? 'black' : 'red')

            return (
              <>
                <Grid key={idx} size={3} sx={{
                  height: '120px',
                }}>
                  {isAdmin ? (
                    <Box
                      component={'button'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        background: '#FFFFFF',
                        border: '2px solid #171717',
                        borderRadius: '6px'
                      }}
                      onClick={() => handleEnvelopeClick(envelope)}
                    >
                      <Typography variant='h6'>{envelope.number}</Typography>
                      {envelope.isPicked && <p style={{
                        margin: '0px',
                        padding: '0px',
                        width: '100%',
                        fontSize: '64px',
                        lineHeight: '64px',
                        textAlign: 'center',
                      }}>
                        {/* @ts-expect-error Argument of type string | undefined is not assignable to parameter of type string*/}
                        {<Icon color={getCardColor(setCardIdentifier(envelope.value, envelope.suit))}/>}</p>
                      }
                    </Box>
                  ) : (
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: '#FFFFFF',
                      border: '2px solid #171717',
                      borderRadius: '6px'
                    }}>
                      <Typography variant='h6'>{envelope.number}</Typography>
                      {envelope.isPicked && <p style={{
                        margin: '0px',
                        padding: '0px',
                        width: '100%',
                        fontSize: '64px',
                        lineHeight: '64px',
                        textAlign: 'center',
                      }}>
                        {/* @ts-expect-error Argument of type string | undefined is not assignable to parameter of type string*/}
                        {<Icon color={getCardColor(setCardIdentifier(envelope.value, envelope.suit))}/>}</p>}
                    </Box>
                  )}
                </Grid>
              </>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default CardDisplay