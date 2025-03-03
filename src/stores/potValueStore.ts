import {create} from 'zustand'
import {db} from '../lib/firebase'
import {collection, doc, getDocs, updateDocs} from '@firebase/firestore'

export type Value = {
  value: number;
}

export type PotValueStore = {
  potValue: number;
  fetchPotValue: () => void;
}

export const usePotValueStore = create<PotValueStore>((set) => ({
  potValue: 0,
  fetchPotValue: async () => {
    const snapshot = await getDocs(collection(db, 'pot-value'))
    const potValues = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    // console.log(potValues[0].value)
    set({potValue: potValues[0].value})
  }
}))