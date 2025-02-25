'use client'
import React from 'react'
import { useEnvelopeStore} from "@/stores/envelopeStore";

export default function Home() {
  const { envelopes, fetchEnvelopes } = useEnvelopeStore();

  React.useEffect(() => {
    fetchEnvelopes();
  }, [])


  return (
    <div>
      <h1>Envelope list</h1>
      {/*<div>*/}
      {/*  {envelopes.map((envelope, idx) => (*/}
      {/*    <div key={idx}>*/}
      {/*      {envelope.card} - {envelope.isPicked ? "Picked" : "Available"}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
}
