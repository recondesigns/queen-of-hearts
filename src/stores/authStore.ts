import { create } from 'zustand'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  logout: async () => {
    await signOut(auth)
    set({ user: null, loading: false })
  },
  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false})
    })
  }
}))