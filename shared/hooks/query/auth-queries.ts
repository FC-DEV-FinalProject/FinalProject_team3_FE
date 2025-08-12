import { useRouter } from 'next/navigation'

import useSearchingItemStore from '@/app/(dashboard)/strategies/_ui/search-bar/_store/use-searching-item-store'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { login, logout, refreshAccessToken } from '@/shared/api/auth'
import axiosInstance from '@/shared/api/axios'
import { PATH } from '@/shared/constants/path'
import { removeAccessToken, setAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { getEmailFromToken } from '@/shared/utils/token-utils'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      const accessToken = response.headers['access-token']?.replace('Bearer ', '')
      if (!accessToken) {
        throw new Error('No access token received')
      }
      try {
        const userEmail = getEmailFromToken(accessToken)
        if (!userEmail) {
          throw new Error('Invalid token')
        }
        const userResponse = await axios.get(`/api/users/mypage/profile?email=${userEmail}`, {
          headers: {
            'access-token': `Bearer ${accessToken}`,
          },
        })
        if (!userResponse.data.isSuccess) {
          throw new Error('Failed to fetch user profile')
        }

        const user = userResponse.data.result
        setAccessToken(accessToken, user)

        useAuthStore.getState().setAuthState({
          isAuthenticated: true,
          user,
        })
      } catch (err) {
        console.error('Login process failed:', err)
        removeAccessToken()
        throw err
      }
    },
  })
}

export const useLogoutMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeAccessToken()
      useAuthStore.getState().setAuthState({
        isAuthenticated: false,
        user: null,
      })
      useSearchingItemStore.getState().actions.resetState()
      router.replace(PATH.SIGN_IN)
    },
    onError: (err) => {
      console.error('Logout failed:', err)
      removeAccessToken()
      useAuthStore.getState().setAuthState({
        isAuthenticated: false,
        user: null,
      })
      useSearchingItemStore.getState().actions.resetState()
      router.replace(PATH.SIGN_IN)
    },
  })
}

export const useRefreshTokenMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: async (response) => {
      const accessToken = response.headers['access-token']?.replace('Bearer ', '')
      if (!accessToken) {
        throw new Error('No access token received')
      }

      try {
        const userEmail = getEmailFromToken(accessToken)
        if (!userEmail) {
          throw new Error('Invalid token after refresh')
        }

        const userResponse = await axiosInstance.get(`/api/users/mypage/profile?email=${userEmail}`)
        if (!userResponse.data.isSuccess) {
          throw new Error('Failed to fetch user profile')
        }

        const user = userResponse.data.result
        setAccessToken(accessToken, user)

        useAuthStore.getState().setAuthState({
          isAuthenticated: true,
          user,
        })
      } catch (err) {
        console.error('Token refresh process failed:', err)
        removeAccessToken()
        useAuthStore.getState().setAuthState({
          isAuthenticated: false,
          user: null,
        })
        router.replace(PATH.SIGN_IN)
        throw err
      }
    },
    onError: (err) => {
      console.error('Token refresh mutation failed:', err)
      removeAccessToken()
      useAuthStore.getState().setAuthState({
        isAuthenticated: false,
        user: null,
      })
      router.replace(PATH.SIGN_IN)
    },
  })
}
