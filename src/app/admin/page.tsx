'use client'
import React from 'react'
import {auth} from '@/lib/firebase'
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from 'next/navigation'
import {useEnvelopeStore} from "@/stores/envelopeStore";
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

  // console.log(111, cardMap['10S'])

  return (
    <div>
      <h1>Admin page</h1>
      <ul>
        {envelopes.map((envelope, idx) => {
          // @ts-expect-error Element implicitly has an any type because expression of type string can't be used to index type
          const Icon: IconType = cardMap[envelope.card] || null

          return (
            <li key={idx}>
              {Icon && <Icon/>}
              {envelope.card} - {envelope.isPicked ? "Picked" : "Available"}
              <button onClick={() => togglePicked(envelope.id, !envelope.isPicked)}>Toggle</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}