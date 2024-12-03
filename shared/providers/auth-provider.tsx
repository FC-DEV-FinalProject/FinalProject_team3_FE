'use client'

import { ReactNode, createContext, useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { PATH } from '@/shared/constants/path'
import { getAccessToken } from '@/shared/lib/auth-tokens'

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const authRequiredPatterns = ['/my/', `${PATH.ADMIN}`, `${PATH.TRADERS}`, `${PATH.STRATEGIES}/`]

  const nonAuthPages = [
    PATH.SIGN_IN,
    PATH.SIGN_UP,
    PATH.SIGN_UP_USER_TYPE,
    PATH.SIGN_UP_TERMS_OF_USE,
    PATH.SIGN_UP_INFORMATION,
    PATH.SIGN_UP_COMPLETE,
  ]

  useEffect(() => {
    const accessToken = getAccessToken()

    const isAuthRequired = authRequiredPatterns.some((pattern) => pathname.startsWith(pattern))
    const isNonAuthPage = nonAuthPages.some((page) => pathname.startsWith(page))

    if (isAuthRequired && !accessToken) {
      router.replace(`${PATH.SIGN_IN}?returnUrl=${pathname}`)
      return
    }

    if (isNonAuthPage && accessToken) {
      router.replace(PATH.STRATEGIES)
      return
    }
  }, [pathname])

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}
