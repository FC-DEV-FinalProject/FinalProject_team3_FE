import { STORAGE_KEYS } from '../constants/auth'

export const setAccessToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
}

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}
