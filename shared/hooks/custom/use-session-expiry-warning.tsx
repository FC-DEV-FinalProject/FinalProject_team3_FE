import { useCallback, useEffect, useRef } from 'react'

import { AUTH_TIME } from '@/shared/constants/auth'
import { useRefreshTokenMutation } from '@/shared/hooks/query/auth-queries'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { useModalStore } from '@/shared/stores/use-modal-store'
import { useSessionStore } from '@/shared/stores/use-session-store'
import { isAdmin } from '@/shared/types/auth'
import SessionExtensionModal from '@/shared/ui/modal/session-extension-modal'

import { useAuth } from './use-auth'

export const useSessionExpiryWarning = () => {
  const { checkTokenStatus } = useAuth()
  const { user } = useAuthStore()
  const { mutate: refreshToken } = useRefreshTokenMutation()
  const { isModalOpen, openModal, onCloseModal } = useModalStore()
  const { setWarningShown, setMinutesLeft, minutesLeft } = useSessionStore()
  const warningShownRef = useRef(false)

  useEffect(() => {
    if (!isModalOpen) return

    const timer = setInterval(() => {
      setMinutesLeft((prev) => {
        const newMinutes = Math.max(0, prev - 1)
        if (newMinutes === 0) {
          onCloseModal()
          warningShownRef.current = false
          setWarningShown(false)
        }
        return newMinutes
      })
    }, 60000)

    return () => clearInterval(timer)
  }, [isModalOpen, onCloseModal, setMinutesLeft, setWarningShown])

  const handleRefreshToken = useCallback(() => {
    refreshToken(undefined, {
      onSuccess: () => {
        onCloseModal()
        warningShownRef.current = false
        setWarningShown(false)
      },
      onError: (error) => {
        console.error('Token refresh failed in session warning:', error)
      },
    })
  }, [refreshToken, onCloseModal, setWarningShown])

  useEffect(() => {
    if (!user || !isAdmin(user)) return

    const checkAndNotify = () => {
      const tokenStatus = checkTokenStatus()

      if (tokenStatus?.isNearExpiry && !warningShownRef.current) {
        const minutes = Math.floor(tokenStatus.timeUntilExpiry / 60000)
        setMinutesLeft(minutes)
        setWarningShown(true)
        warningShownRef.current = true
        openModal()
      }
    }

    checkAndNotify()
    const interval = setInterval(checkAndNotify, AUTH_TIME.TOKEN_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [checkTokenStatus, openModal, setMinutesLeft, setWarningShown, user])

  return (
    <SessionExtensionModal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
      onExtend={handleRefreshToken}
      minutesLeft={minutesLeft}
    />
  )
}
