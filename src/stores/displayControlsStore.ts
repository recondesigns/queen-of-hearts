import {create} from 'zustand'

export type ControlsStore = {
  show: 'all' | 'picked' | 'unpicked';
  setShow: (str: string) => void;
}

export const useDisplayControlsStore = create<ControlsStore>((set) => ({
  show: 'all',
  setShow: (str:string) => {
    set({show: str})
  }
}))












export type DisplayControlsStore = {
  show: 'all' | 'picked' | 'unpicked';
  setShow: () => void
}