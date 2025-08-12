import { useCallback, useEffect } from 'react'

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
  const {
    isModalOpen: isSessionModalOpen,
    openModal: openSessionModal,
    onCloseModal: closeSessionModal,
  } = useModalStore()
  const { isWarningShown, setWarningShown, setMinutesLeft, minutesLeft } = useSessionStore()

  const handleRefreshToken = useCallback(() => {
    refreshToken(undefined, {
      onSuccess: () => {
        closeSessionModal()
        setWarningShown(false)
      },
      onError: (err) => {
        console.error('Token refresh failed in session warning:', err)
      },
    })
  }, [refreshToken, closeSessionModal, setWarningShown])

  const performCheck = useCallback(() => {
    if (!user || !isAdmin(user)) return

    const tokenStatus = checkTokenStatus()

    if (tokenStatus?.isNearExpiry && !isWarningShown) {
      const minutes = Math.floor(tokenStatus.timeUntilExpiry / 60000)
      setMinutesLeft(minutes)
      setWarningShown(true)
      openSessionModal()
    }
  }, [user, checkTokenStatus, isWarningShown, setMinutesLeft, setWarningShown, openSessionModal])

  useEffect(() => {
    performCheck()
  }, [performCheck])

  useEffect(() => {
    const interval = setInterval(performCheck, AUTH_TIME.TOKEN_CHECK_INTERVAL)
    return () => clearInterval(interval)
  }, [performCheck])

  useEffect(() => {
    if (!isSessionModalOpen) return

    const timer = setInterval(() => {
      setMinutesLeft((prev) => {
        const newMinutes = Math.max(0, prev - 1)
        if (newMinutes === 0) {
          closeSessionModal()
          setWarningShown(false)
        }
        return newMinutes
      })
    }, 60000)

    return () => clearInterval(timer)
  }, [isSessionModalOpen, closeSessionModal, setMinutesLeft, setWarningShown])

  return (
    <SessionExtensionModal
      isModalOpen={isSessionModalOpen}
      onCloseModal={closeSessionModal}
      onExtend={handleRefreshToken}
      minutesLeft={minutesLeft}
    />
  )
}
