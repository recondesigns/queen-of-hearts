import {create} from 'zustand'

export type LogInStore = {
  email: string;
  setEmail: (updatedEmail: string) => void;
  password: string;
  setPassword: (updatedPassword: string) => void;
  error: string;
  setError: (updatedError: string) => void;
}

export const useLogInStore = create<LogInStore>((set) => ({
  email: '',
  password: '',
  error: '',
  setEmail: (updatedEmail: LogInStore['email']) => {
    set({ email: updatedEmail})
  },
  setPassword: (updatedPassword: LogInStore['password']) => {
    set({ password: updatedPassword})
  },
  setError: (updatedError: string) => {
    set({error: updatedError})
  }
}))