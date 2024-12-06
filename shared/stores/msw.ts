import { create } from 'zustand'

import { isDevelopment } from '@/shared/utils/env'

interface Props {
  isReady: boolean
  setReady: (ready: boolean) => void
}

export const useMSWStore = create<Props>((set) => ({
  isReady: !isDevelopment,
  setReady: (ready) => set({ isReady: ready }),
}))
