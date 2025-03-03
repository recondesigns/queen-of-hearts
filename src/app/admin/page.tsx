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
import Button from '@mui/material/Button'
import UpdatePotValueModal from './UpdatePotValueModal';

export default function AdminPage() {
  const {envelopes, fetchEnvelopes, togglePicked} = useEnvelopeStore()
  const {potValue, fetchPotValue} = usePotValueStore()
  const {user, loading} = useAuthStore()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const router = useRouter()

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

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
      <UpdatePotValueModal open={isModalOpen} onClose={handleModalClose} />
      <h1>Admin page</h1>
      <PotDisplay potValue={potValue} />
      <Button variant={'contained'} onClick={handleModalOpen}>Update pot</Button>
      <CardDisplay envelopes={envelopes} isAdmin={true} />
    </Box>
  )
}

{/*<button*/
}
{/*  onClick={() => togglePicked(envelope.id, true, 'Queen of Hearts', 'hearts', 'Q')}>Update*/
}
{/*</button>*/
}