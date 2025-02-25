'use client'
import React from 'react'
import {auth} from '@/lib/firebase'
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from 'next/navigation'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {IconType} from 'react-icons'
import cardMap from "@/lib/cardsMap";

const convertSuit = (suit: string) => {
  switch(suit) {
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

export default function AdminPage() {
  const {envelopes, fetchEnvelopes, togglePicked} = useEnvelopeStore()
  const {user, loading} = useAuthStore()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user, router])

  React.useEffect(() => {
    fetchEnvelopes()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push('/login')
    })

    return () => unsubscribe()
  }, [fetchEnvelopes, router])

  if (loading) return <p>Loading...</p>

  return (
    <Box>
      <h1>Admin page</h1>
      <Grid container spacing={0} sx={{border: '2px solid dodgerblue'}}>
        {envelopes.map((envelope, idx) => {
          // @ts-expect-error Element implicitly has an any type because expression of type string can't be used to index type
          const Icon: IconType = cardMap[setCardIdentifier(envelope.value, envelope.suit)] || null
          return (
            <Grid key={idx} item xs={2} sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              border: '1px solid #171717',
              borderRadius: '6px'
            }}>
              <Box sx={{ }}>
                <Typography variant='h6'>{envelope.number}</Typography>
                {envelope.isPicked && <Typography variant='h3' component={'p'}>{<Icon color={'red'}/>}</Typography>}
              </Box>
              {/*<button*/}
              {/*  onClick={() => togglePicked(envelope.id, true, 'Queen of Hearts', 'hearts', 'Q')}>Update*/}
              {/*</button>*/}
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}