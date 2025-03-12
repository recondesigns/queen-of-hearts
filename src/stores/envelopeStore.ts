import {create} from 'zustand'
import {db} from '../lib/firebase'
import {collection, doc, getDocs, updateDoc} from "@firebase/firestore";

export type Envelope = {
  id: string;
  number?: string;
  isPicked: boolean;
  suit?: string;
  value?: string;
  name?: string
}

export type EnvelopeStore = {
  envelopes: Envelope[];
  fetchEnvelopes: () => Promise<void>;
  selectedEnvelope: Envelope | null;
  setSelectedEnvelope: (envelope: Envelope) => void;
  togglePicked: (id: string, isPicked: boolean, name: string, suit: string, value: string) => Promise<void>;
}


export const useEnvelopeStore = create<EnvelopeStore>((set) => ({
  envelopes: [],
  selectedEnvelope: null,
  fetchEnvelopes: async () => {

    const snapshot = await getDocs(collection(db, 'game-envelopes'))
    const envelopes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Envelope[]

    set({envelopes})
  },
  setSelectedEnvelope: (envelope: Envelope) => {
    set({selectedEnvelope: envelope})
  },
  // TODO: need to change the togglePicked name
  togglePicked: async (id, isPicked: boolean, name: string, suit: string, value: string) => {
    const pickedDate = new Date().toISOString().split('T')[0]
    const envelopeRef = doc(db, 'game-envelopes', id)
    await updateDoc(envelopeRef, {isPicked, name, suit, value, pickedDate})

    set((state) => ({
      envelopes: state.envelopes.map((e) => e.id === id ? {...e, isPicked, name, suit, value, pickedDate} : e)
    }))
  }
}))