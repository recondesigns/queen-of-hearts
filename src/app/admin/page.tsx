'use client'
import React from 'react'
import {auth} from '@/lib/firebase'
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from 'next/navigation'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import {usePotValueStore} from "@/stores/potValueStore";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PotDisplay  from "../components/pot-display/PotDisplay";
import CardDisplay from '../components/card-display/CardDisplay'
import UpdatePotValueModal from './UpdatePotValueModal';

export default function AdminPage() {
  const {envelopes, fetchEnvelopes} = useEnvelopeStore()
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
    <Box component={'main'}>
      <UpdatePotValueModal open={isModalOpen} onClose={handleModalClose} />
      <Box component={'section'}>
        <Typography variant={'h5'} component={'p'}>Admin page</Typography>
        <PotDisplay potValue={potValue} />
        <Button variant={'contained'} onClick={handleModalOpen}>Update pot</Button>
      </Box>
      <Box component={'section'}>
        <CardDisplay envelopes={envelopes} isAdmin={true} />
      </Box>
    </Box>
  )
}