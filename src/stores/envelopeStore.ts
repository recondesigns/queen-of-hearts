import {create} from 'zustand'
import {db} from '../lib/firebase'
import {collection, doc, getDocs, updateDoc} from "@firebase/firestore";

type Envelope = {
  id: string,
  card: string,
  isPicked: boolean
}

type EnvelopStore = {
  envelopes: Envelope[],
  fetchEnvelopes: () => Promise<void>,
  togglePicked: (id: string, isPicked: boolean, name: string, suit: string, value: string) => Promise<void>
}


export const useEnvelopeStore = create<EnvelopStore>((set) => ({
  envelopes: [],
  fetchEnvelopes: async () => {

    const snapshot = await getDocs(collection(db, 'envelopes2'))
    const envelopes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Envelope[]

    set({envelopes})
  },
  togglePicked: async (id, isPicked: boolean, name: string, suit: string, value: string) => {
    const pickedDate = new Date().toISOString().split('T')[0]
    const envelopeRef = doc(db, 'envelopes2', id)
    await updateDoc(envelopeRef, {isPicked, name, suit, value, pickedDate})

    set((state) => ({
      envelopes: state.envelopes.map((e) => e.id === id ? {...e, isPicked, name, suit, value, pickedDate} : e)
    }))
  }
}))