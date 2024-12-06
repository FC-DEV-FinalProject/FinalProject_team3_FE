import { useCallback, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { AUTH_TIME } from '@/shared/constants/auth'
import { useLogoutMutation } from '@/shared/hooks/query/auth-queries'
import { getAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { TokenStatusModel, isAdmin } from '@/shared/types/auth'
import { isAuthRequiredPath } from '@/shared/utils/auth-path'
import { getTimeUntilExpiry } from '@/shared/utils/token-utils'

export const useAuth = () => {
  const { mutate: logout } = useLogoutMutation()
  const pathname = usePathname()

  const checkTokenStatus = useCallback((): TokenStatusModel | null => {
    const accessToken = getAccessToken()
    const { user } = useAuthStore.getState()

    if (!accessToken || !user) {
      return null
    }

    try {
      const timeUntilExpiry = getTimeUntilExpiry(accessToken)

      if (timeUntilExpiry <= 0) {
        logout()
        return null
      }

      if (isAdmin(user)) {
        if (localStorage.getItem('access_token')) {
          logout()
          return null
        }
      }

      return {
        isValid: true,
        timeUntilExpiry,
        isNearExpiry: timeUntilExpiry < AUTH_TIME.ADMIN_EXPIRY_WARNING,
      }
    } catch (error) {
      console.error('Token status check failed:', error)
      logout()
      return null
    }
  }, [logout])

  useEffect(() => {
    if (!isAuthRequiredPath(pathname)) {
      return
    }

    const status = checkTokenStatus()
    if (!status) {
      return
    }

    const interval = setInterval(() => {
      const currentStatus = checkTokenStatus()
      if (!currentStatus) {
        clearInterval(interval)
      }
    }, AUTH_TIME.TOKEN_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [pathname, checkTokenStatus])

  return {
    logout,
    checkTokenStatus,
  }
}
