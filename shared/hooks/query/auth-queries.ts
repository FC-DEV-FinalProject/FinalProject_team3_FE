import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { login, logout } from '@/shared/api/auth'
import axiosInstance from '@/shared/api/axios'
import { STORAGE_KEYS } from '@/shared/constants/auth'
import { PATH } from '@/shared/constants/path'
import { setAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { isAdmin } from '@/shared/types/auth'
import { getEmailFromToken } from '@/shared/utils/token-utils'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      const accessToken = response.headers['access-token']?.replace('Bearer ', '')
      if (accessToken) {
        setAccessToken(accessToken)

        try {
          const userEmail = getEmailFromToken(accessToken)
          if (!userEmail) throw new Error('Invalid token')

          const userResponse = await axiosInstance.get(
            `/api/users/mypage/profile?email=${userEmail}`
          )
          if (userResponse.data.isSuccess) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userResponse.data.result))

            if (!isAdmin(userResponse.data.result)) {
              sessionStorage.setItem(STORAGE_KEYS.SESSION, 'true')
            }

            useAuthStore.getState().setAuthState({
              isAuthenticated: true,
              user: userResponse.data.result,
              isLoggedOut: false,
            })
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error)
          throw error
        }
      }
    },
  })
}

export const useLogoutMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      sessionStorage.removeItem(STORAGE_KEYS.SESSION)

      useAuthStore.getState().setAuthState({
        isAuthenticated: false,
        user: null,
        isLoggedOut: true,
      })

      router.replace(PATH.SIGN_IN)
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      sessionStorage.removeItem(STORAGE_KEYS.SESSION)

      useAuthStore.getState().setAuthState({
        isAuthenticated: false,
        user: null,
        isLoggedOut: true,
      })

      router.replace(PATH.SIGN_IN)
    },
  })
}
