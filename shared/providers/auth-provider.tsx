'use client'

import { ReactNode, createContext, useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { PATH } from '@/shared/constants/path'
import { getAccessToken } from '@/shared/lib/auth-tokens'

import { useAuth } from '../hooks/custom/use-auth'
import { useSessionExpiryWarning } from '../hooks/custom/use-session-expiry-warning'
import { useAuthStore } from '../stores/use-auth-store'
import { isAuthRequiredPath, isNonAuthPage } from '../utils/auth-path'

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { initializeAuthState } = useAuthStore()

  useAuth()
  const SessionExpiryWarningModal = useSessionExpiryWarning()

  useEffect(() => {
    initializeAuthState()
  }, [initializeAuthState])

  useEffect(() => {
    const accessToken = getAccessToken()

    if (isAuthRequiredPath(pathname) && !accessToken) {
      router.replace(`${PATH.SIGN_IN}?returnUrl=${pathname}`)
      return
    }

    if (isNonAuthPage(pathname) && accessToken) {
      router.replace(PATH.STRATEGIES)
      return
    }
  }, [pathname, router])

  return (
    <AuthContext.Provider value={null}>
      {children}
      {SessionExpiryWarningModal}
    </AuthContext.Provider>
  )
}
