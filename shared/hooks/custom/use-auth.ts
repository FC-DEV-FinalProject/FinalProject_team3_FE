import { useEffect } from 'react'

import { AUTH_TIME, STORAGE_KEYS } from '@/shared/constants/auth'
import { useLogoutMutation } from '@/shared/hooks/query/auth-queries'
import { getAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { TokenStatusModel, isAdmin } from '@/shared/types/auth'
import { getTimeUntilExpiry, isTokenExpired } from '@/shared/utils/token-utils'

export const useAuth = () => {
  const { isKeepLoggedIn, isLoggedOut } = useAuthStore()
  const { mutate: logout } = useLogoutMutation()

  const checkTokenStatus = (): TokenStatusModel | null => {
    const accessToken = getAccessToken()
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)

    if (!accessToken || !userStr) {
      logout()
      return null
    }

    try {
      const user = JSON.parse(userStr)
      const isExpired = isTokenExpired(accessToken)
      const timeUntilExpiry = getTimeUntilExpiry(accessToken)

      if (isExpired) {
        logout()
        return null
      }

      if (!isAdmin(user)) {
        const sessionToken = sessionStorage.getItem(STORAGE_KEYS.SESSION)
        if (!isKeepLoggedIn && !sessionToken) {
          logout()
          return null
        }
      }

      return {
        isValid: !isExpired,
        timeUntilExpiry,
        isNearExpiry: timeUntilExpiry < AUTH_TIME.ADMIN_EXPIRY_WARNING,
      }
    } catch (error) {
      console.error('Failed to parse user data:', error)
      logout()
      return null
    }
  }

  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = getAccessToken()
      const userStr = localStorage.getItem(STORAGE_KEYS.USER)
      if (isLoggedOut !== false) return

      if (!accessToken || !userStr) {
        logout()
        return
      }

      try {
        const user = JSON.parse(userStr)

        if (isTokenExpired(accessToken)) {
          logout()
          return
        }

        if (!isAdmin(user)) {
          const sessionToken = sessionStorage.getItem(STORAGE_KEYS.SESSION)
          if (!isKeepLoggedIn && !sessionToken) {
            logout()
            return
          }
        }

        useAuthStore.getState().setAuthState({
          isAuthenticated: true,
          user,
          isLoggedOut: false,
        })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        logout()
      }
    }

    initializeAuth()
    const interval = setInterval(checkTokenStatus, AUTH_TIME.TOKEN_CHECK_INTERVAL)
    return () => clearInterval(interval)
  }, [isKeepLoggedIn, logout])

  return { logout, checkTokenStatus }
}
