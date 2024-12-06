import { STORAGE_KEYS } from '../constants/auth'
import { useAuthStore } from '../stores/use-auth-store'
import { UserModel, isAdmin } from '../types/auth'

export const setAccessToken = (token: string, user: UserModel | null) => {
  if (!user || !token) return

  const { isKeepLoggedIn } = useAuthStore.getState()
  const storage = isAdmin(user) ? sessionStorage : isKeepLoggedIn ? localStorage : sessionStorage

  storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
}

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null

  return (
    sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ||
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  )
}

export const removeAccessToken = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
  sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}
