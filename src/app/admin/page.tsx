'use client'
import React from 'react'
import {auth} from '@/lib/firebase'
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from 'next/navigation'
import {useEnvelopeStore} from "@/stores/envelopeStore";
import {usePotValueStore} from "@/stores/potValueStore";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
    <Box
      component={'main'}
      py={4}
      px={{xs: 2, md: 4, lg: 6}}
    >
      <UpdatePotValueModal open={isModalOpen} onClose={handleModalClose} />
      <Box component={'section'} pb={4}>
        <PotDisplay potValue={potValue} />
        <Button variant={'contained'} fullWidth onClick={handleModalOpen}>Update pot</Button>
      </Box>
      <Box component={'section'}>
        <CardDisplay envelopes={envelopes} isAdmin={true} />
      </Box>
    </Box>
  )
}