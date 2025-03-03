'use client'
import React from 'react'
import {auth} from '@/lib/firebase'
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from 'next/navigation'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import {usePotValueStore} from "@/stores/potValueStore";
import Box from '@mui/material/Box'
import PotDisplay  from "../components/pot-display/PotDisplay";
import CardDisplay from '../components/card-display/CardDisplay'

export default function AdminPage() {
  const {envelopes, fetchEnvelopes, togglePicked} = useEnvelopeStore()
  const {potValue, fetchPotValue} = usePotValueStore()
  const {user, loading} = useAuthStore()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user, router])

  React.useEffect(() => {
    fetchEnvelopes()
    // TODO: I am duplicating this call with the landing page
    fetchPotValue()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push('/login')
    })

    return () => unsubscribe()
  }, [fetchEnvelopes, router])

  if (loading) return <p>Loading...</p>

  return (
    <Box>
      <h1>Admin page</h1>
      <PotDisplay potValue={potValue} />
      <CardDisplay envelopes={envelopes}/>
    </Box>
  )
}

{/*<button*/
}
{/*  onClick={() => togglePicked(envelope.id, true, 'Queen of Hearts', 'hearts', 'Q')}>Update*/
}
{/*</button>*/
}