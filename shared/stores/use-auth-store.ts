import { create } from 'zustand'

import { STORAGE_KEYS } from '../constants/auth'
import { type UserModel, isAdmin } from '../types/auth'

interface AuthStateModel {
  isAuthenticated: boolean
  user: UserModel | null
  isKeepLoggedIn: boolean
}

interface AuthActionsModel {
  setKeepLoggedIn: (value: boolean) => void
  setAuthState: (state: Partial<AuthStateModel>) => void
  initializeAuthState: () => void
}

type AuthStoreType = AuthStateModel & AuthActionsModel

const initialState: AuthStateModel = {
  isAuthenticated: false,
  user: null,
  isKeepLoggedIn: false,
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  ...initialState,

  setKeepLoggedIn: (value) => {
    set((state) => {
      const updatedState = {
        ...state,
        isKeepLoggedIn: value,
      }

      if (state.isAuthenticated && state.user) {
        if (isAdmin(state.user)) {
          sessionStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify({
              isAuthenticated: state.isAuthenticated,
              user: state.user,
              isKeepLoggedIn: false,
            })
          )
          localStorage.removeItem(STORAGE_KEYS.USER)
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        } else {
          const storage = value ? localStorage : sessionStorage
          storage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify({
              isAuthenticated: state.isAuthenticated,
              user: state.user,
              isKeepLoggedIn: value,
            })
          )
          const otherStorage = value ? sessionStorage : localStorage
          otherStorage.removeItem(STORAGE_KEYS.USER)
          otherStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        }
      }

      return updatedState
    })
  },

  setAuthState: (newState) => {
    set((state) => {
      const updatedState = { ...state, ...newState }

      if (updatedState.isAuthenticated && updatedState.user) {
        if (isAdmin(updatedState.user)) {
          sessionStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify({
              isAuthenticated: updatedState.isAuthenticated,
              user: updatedState.user,
              isKeepLoggedIn: false,
            })
          )
          localStorage.removeItem(STORAGE_KEYS.USER)
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        } else {
          const storage = updatedState.isKeepLoggedIn ? localStorage : sessionStorage
          storage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify({
              isAuthenticated: updatedState.isAuthenticated,
              user: updatedState.user,
              isKeepLoggedIn: updatedState.isKeepLoggedIn,
            })
          )
          const otherStorage = updatedState.isKeepLoggedIn ? sessionStorage : localStorage
          otherStorage.removeItem(STORAGE_KEYS.USER)
          otherStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        }
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER)
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        sessionStorage.removeItem(STORAGE_KEYS.USER)
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      }

      return updatedState
    })
  },

  initializeAuthState: () => {
    if (typeof window === 'undefined') return

    const sessionAuth = sessionStorage.getItem(STORAGE_KEYS.USER)
    const localAuth = localStorage.getItem(STORAGE_KEYS.USER)

    if (sessionAuth) {
      try {
        const authData = JSON.parse(sessionAuth)
        if (isAdmin(authData.user)) {
          set({
            isAuthenticated: true,
            user: authData.user,
            isKeepLoggedIn: false,
          })
          return
        } else {
          set({
            isAuthenticated: true,
            user: authData.user,
            isKeepLoggedIn: false,
          })
          return
        }
      } catch (error) {
        console.error('Failed to parse session user data:', error)
        sessionStorage.removeItem(STORAGE_KEYS.USER)
      }
    }

    if (localAuth) {
      try {
        const authData = JSON.parse(localAuth)
        if (!isAdmin(authData.user)) {
          set({
            isAuthenticated: true,
            user: authData.user,
            isKeepLoggedIn: true,
          })
        }
      } catch (error) {
        console.error('Failed to parse local user data:', error)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }
  },
}))
