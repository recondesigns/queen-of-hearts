import {create} from 'zustand'

export type ControlsStore = {
  show: 'all' | 'picked' | 'unpicked';
  setShow: (str: ControlsStore['show']) => void;
}

export const useDisplayControlsStore = create<ControlsStore>((set) => ({
  show: 'all',
  setShow: (str: ControlsStore['show']) => {
    set({show: str})
  }
}))












export type DisplayControlsStore = {
  show: 'all' | 'picked' | 'unpicked';
  setShow: () => void
}