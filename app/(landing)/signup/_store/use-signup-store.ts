import { create } from 'zustand'

import { UserType } from '@/shared/types/auth'

interface StateModel {
  userType: UserType
  nickname: string
}

interface ActionModel {
  setUserType: (userType: UserType) => void
  setNickname: (nickname: string) => void
}

interface ActionsModel {
  actions: ActionModel
}

const initialState = {
  userType: 'INVESTOR',
  nickname: '',
} as const

const useSignupStore = create<StateModel & ActionsModel>((set) => ({
  ...initialState,
  actions: {
    setUserType: (userType) => set((state) => ({ ...state, userType })),
    setNickname: (nickname) => set((state) => ({ ...state, nickname })),
  },
}))

export default useSignupStore
