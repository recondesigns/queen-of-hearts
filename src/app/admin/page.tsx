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
          const Icon: IconType = cardMap[envelope.card] || null
          console.log(111, envelope)
          return (
            <Grid key={idx} item xs={2} sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid orange'
            }}>
              {envelope.isPicked && <Typography variant='h3' component={'p'}>{<Icon color={'red'}/>}</Typography>}
              <Typography variant='h5'>{envelope.number}</Typography>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}