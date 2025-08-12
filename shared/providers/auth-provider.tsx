'use client'

import { ReactNode, createContext, useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { PATH } from '@/shared/constants/path'
import useModal from '@/shared/hooks/custom/use-modal'
import { useSessionExpiryWarning } from '@/shared/hooks/custom/use-session-expiry-warning'
import { getAccessToken } from '@/shared/lib/auth-tokens'
import SigninCheckModal from '@/shared/ui/modal/signin-check-modal'

import { useAuth } from '../hooks/custom/use-auth'
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
  const { isModalOpen, openModal, closeModal } = useModal()
  const SessionModal = useSessionExpiryWarning()

  useAuth()

  useEffect(() => {
    initializeAuthState()
  }, [initializeAuthState])

  useEffect(() => {
    const accessToken = getAccessToken()

    if (isAuthRequiredPath(pathname) && !accessToken) {
      openModal()
      return
    }

    if (isNonAuthPage(pathname) && accessToken) {
      router.replace(PATH.STRATEGIES)
      return
    }
  }, [pathname, router])

  const handleLoginConfirm = () => {
    closeModal()
    router.push(`${PATH.SIGN_IN}?returnUrl=${pathname}`)
  }

  return (
    <AuthContext.Provider value={null}>
      {children}
      <SigninCheckModal
        isModalOpen={isModalOpen}
        onCloseModal={closeModal}
        onConfirm={handleLoginConfirm}
      />
      {SessionModal}
    </AuthContext.Provider>
  )
}
