'use client'
import React from 'react'
import { useEnvelopeStore} from "@/stores/envelopeStore";
import { usePotValueStore} from '@/stores/potValueStore'
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
    <div>
      <h1>Envelope list</h1>
      <div>
        <PotDisplay potValue={potValue} />
        <CardDisplay envelopes={envelopes} />
      </div>
    </div>
  );
}
