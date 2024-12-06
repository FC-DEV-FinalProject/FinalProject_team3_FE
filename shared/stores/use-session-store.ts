import { create } from 'zustand'

interface SessionStoreModel {
  isWarningShown: boolean
  minutesLeft: number
  setWarningShown: (shown: boolean) => void
  setMinutesLeft: (minutes: number | ((prev: number) => number)) => void
}

export const useSessionStore = create<SessionStoreModel>()((set) => ({
  isWarningShown: false,
  minutesLeft: 0,

  setWarningShown: (shown) => set({ isWarningShown: shown }),

  setMinutesLeft: (minutes) =>
    set((state) => ({
      minutesLeft: typeof minutes === 'function' ? minutes(state.minutesLeft) : minutes,
    })),
}))
