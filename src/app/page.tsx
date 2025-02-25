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
      <ul>
        {envelopes.map((envelope, idx) => (
          <li key={idx}>
            {envelope.card} - {envelope.isPicked ? "Picked" : "Available"}
          </li>
        ))}
      </ul>
    </div>
  );
}
