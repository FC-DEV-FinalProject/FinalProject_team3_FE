import { jwtDecode } from 'jwt-decode'

import { setAccessToken } from '@/shared/lib/auth-tokens'
import { TokenPayloadModel } from '@/shared/types/auth'

import { refreshAccessToken } from '../api/auth'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

export const refreshToken = async (): Promise<string | null> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push((token) => resolve(token))
    })
  }

  try {
    isRefreshing = true

    const response = await refreshAccessToken()

    if (!response.data.isSuccess) {
      return null
    }

    const newAccessToken = response.headers['access-token']?.replace('Bearer ', '')

    if (newAccessToken) {
      setAccessToken(newAccessToken)
      refreshSubscribers.forEach((cb) => cb(newAccessToken))
      return newAccessToken
    }

    return null
  } catch (err) {
    console.error('Token refresh failed:', err)
    return null
  } finally {
    isRefreshing = false
    refreshSubscribers = []
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const getEmailFromToken = (token: string | null): string | null => {
  if (!token) return null
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    return decoded.email
  } catch {
    return null
  }
}

export const getTimeUntilExpiry = (token: string): number => {
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    return decoded.exp * 1000 - Date.now()
  } catch {
    return 0
  }
}
