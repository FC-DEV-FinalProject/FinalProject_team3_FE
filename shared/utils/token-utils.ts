import { jwtDecode } from 'jwt-decode'

import { setAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { TokenPayloadModel } from '@/shared/types/auth'

import { refreshAccessToken } from '../api/auth'
import { AUTH_TIME } from '../constants/auth'

let isRefreshInProgress = false
let pendingRefreshRequests: ((token: string) => void)[] = []

export const refreshToken = async (): Promise<string | null> => {
  if (isRefreshInProgress) {
    return new Promise((resolve) => {
      pendingRefreshRequests.push((token) => resolve(token))
    })
  }

  try {
    isRefreshInProgress = true
    const response = await refreshAccessToken()

    if (!response.data.isSuccess) {
      return null
    }

    const newAccessToken = response.headers['access-token']?.replace('Bearer ', '')
    if (!newAccessToken) {
      return null
    }

    const currentUser = useAuthStore.getState().user
    if (!currentUser) {
      return null
    }

    setAccessToken(newAccessToken, currentUser)
    pendingRefreshRequests.forEach((callback) => callback(newAccessToken))
    return newAccessToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  } finally {
    isRefreshInProgress = false
    pendingRefreshRequests = []
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    const currentTime = Date.now()
    const expiryTime = decoded.exp * 1000

    return expiryTime - currentTime <= AUTH_TIME.SAFETY_MARGIN
  } catch (error) {
    console.error('Token expiry check failed:', error)
    return true
  }
}

export const isNearExpiry = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    const currentTime = Date.now()
    const expiryTime = decoded.exp * 1000

    return expiryTime - currentTime < AUTH_TIME.ADMIN_EXPIRY_WARNING
  } catch (error) {
    console.error('Near expiry check failed:', error)
    return true
  }
}

export const getEmailFromToken = (token: string | null): string | null => {
  if (!token) return null

  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    return decoded.email || null
  } catch (error) {
    console.error('Email extraction failed:', error)
    return null
  }
}

export const getTimeUntilExpiry = (token: string): number => {
  try {
    const decoded = jwtDecode<TokenPayloadModel>(token)
    const currentTime = Date.now()
    const expiryTime = decoded.exp * 1000

    return Math.max(0, expiryTime - currentTime)
  } catch (error) {
    console.error('Time until expiry calculation failed:', error)
    return 0
  }
}
