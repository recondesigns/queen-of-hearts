import {create} from 'zustand'
import {db} from '../lib/firebase'
import {collection, doc, getDocs, updateDoc} from '@firebase/firestore'

export type Value = {
  value: number;
}

export type PotValueStore = {
  potValue: number;
  fetchPotValue: () => void;
  updatePotValue: (newValue: number) => Promise<void>
}

export const usePotValueStore = create<PotValueStore>((set) => ({
  potValue: 0,
  fetchPotValue: async () => {
    // TODO: I could probably just use getDoc and use the document id with env
    const snapshot = await getDocs(collection(db, 'pot-value'))
    const potValues = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    // @ts-expect-error TS2339: Property value does not exist on type { id: string; }
    set({potValue: potValues[0].value})
  },
  updatePotValue: async (newValue: number) => {
    const updatedDate = new Date().toISOString().split('T')[0]
    const valueRef = doc(db, 'pot-value', `${process.env.NEXT_PUBLIC_FIREBASE_POT_VALUE_ID}`)

    await updateDoc(valueRef, {value: newValue, updatedDate})

    set({potValue: newValue})
  }
}))