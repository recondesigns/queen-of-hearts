'use client'
import React from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {IconType} from "react-icons";
import cardMap from "@/lib/cardsMap";
import Typography from "@mui/material/Typography";
import { Envelope } from '../../../stores/envelopeStore'

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
  envelopes: Envelope[],
}

const CardDisplay = ({envelopes}: CardDisplayProps) => {
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {envelopes.sort((a, b) => a.number - b.number).map((envelope, idx) => {
            // @ts-expect-error Element implicitly has an any type because expression of type string can't be used to index type
            const Icon: IconType = cardMap[setCardIdentifier(envelope.value, envelope.suit)] || null

            const getCardColor = (string: string) => (string.endsWith('C') || string.endsWith('S') ? 'black' : 'red')

            return (
              <>
                <Grid key={idx} size={3} sx={{
                  height: '120px',
                  border: '1px solid #171717',
                  borderRadius: '6px'
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Typography variant='h6'>{envelope.number}</Typography>
                    {envelope.isPicked && <p style={{
                      margin: '0px',
                      padding: '0px',
                      width: '100%',
                      fontSize: '64px',
                      lineHeight: '64px',
                      textAlign: 'center',
                    }}>{<Icon color={getCardColor(setCardIdentifier(envelope.value, envelope.suit))}/>}</p>}
                  </Box>
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