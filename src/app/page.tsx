'use client'
import React from 'react'
import { useEnvelopeStore} from "@/stores/envelopeStore";
import { usePotValueStore} from '@/stores/potValueStore'
import Box from '@mui/material/Box'
import PotDisplay from './components/pot-display/PotDisplay'
import CardDisplay from './components/card-display/CardDisplay'

export default function Home() {
  const { envelopes, fetchEnvelopes } = useEnvelopeStore();
  const { potValue, fetchPotValue } = usePotValueStore();

  React.useEffect(() => {
    fetchEnvelopes();
    // TODO: I am duplicating this call with the admin page
    fetchPotValue()
  }, [])

  return (
    <Box
      component={'main'}
      py={4}
      px={{xs: 2, md: 4, lg: 6}}
    >

      <Box component={'section'} pb={4}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Box sx={{width: '100%', maxWidth: '400px'}}>
            <PotDisplay potValue={potValue} />
          </Box>
        </Box>
      </Box>
      <Box component={'section'}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Box sx={{width: '100%', maxWidth: '400px'}}>
            <CardDisplay envelopes={envelopes} isAdmin={false} />
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
