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
  togglePicked: (id: string, isPicked: boolean) => Promise<void>
}


export const useEnvelopeStore = create<EnvelopStore>((set) => ({
  envelopes: [],
  fetchEnvelopes: async () => {

    const snapshot = await getDocs(collection(db, 'envelopes'))
    const envelopes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Envelope[]

    set({envelopes})
  },
  togglePicked: async (id, isPicked) => {
    const envelopeRef = doc(db, 'envelopes', id)
    await updateDoc(envelopeRef, {isPicked})

    set((state) => ({
      envelopes: state.envelopes.map((e) => e.id === id ? {...e, isPicked} : e)
    }))
  }
}))