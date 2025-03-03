'use client'
import React from 'react'
import { useEnvelopeStore} from "@/stores/envelopeStore";
import PotDisplay from './components/pot-display/PotDisplay'
import CardDisplay from './components/card-display/CardDisplay'

export default function Home() {
  const { envelopes, fetchEnvelopes } = useEnvelopeStore();

  React.useEffect(() => {
    fetchEnvelopes();
  }, [])


  return (
    <div>
      <h1>Envelope list</h1>
      <div>
        <PotDisplay />
        <CardDisplay envelopes={envelopes} />
      </div>
    </div>
  );
}
