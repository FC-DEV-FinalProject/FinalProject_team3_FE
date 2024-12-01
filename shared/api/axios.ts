import axios from 'axios'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { getUserFromToken, isTokenExpired, refreshToken } from '@/shared/utils/token-utils'

import { isAdmin } from '../types/auth'

export const createAxiosInstance = (options: { withInterceptors?: boolean } = {}) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
  })

  instance.interceptors.request.use((config) => {
    if (
      config.url?.includes('/api/users/login') ||
      config.url?.includes('/api/users/reissue/refreshtoken')
    ) {
      config.baseURL = ''
    }
    return config
  })

  if (options.withInterceptors && typeof window !== 'undefined') {
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const { isLoggedOut } = useAuthStore.getState()
        const accessToken = getAccessToken()

        if (isLoggedOut || !accessToken) {
          return config
        }

        try {
          const user = getUserFromToken(accessToken)

          if (isAdmin(user) && isTokenExpired(accessToken)) {
            useAuthStore.getState().setAuthState({
              isAuthenticated: false,
              user: null,
              isKeepLoggedIn: false,
              isLoggedOut: true,
            })
            return config
          }

          config.headers.Authorization = `Bearer ${accessToken}`
        } catch (err) {
          console.error('토큰 디코딩 실패:', err)
          useAuthStore.getState().setAuthState({
            isAuthenticated: false,
            user: null,
            isKeepLoggedIn: false,
            isLoggedOut: true,
          })
        }

        return config
      },
      (err) => Promise.reject(err)
    )

    instance.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        if (!err.config) return Promise.reject(err)

        const originalRequest = err.config
        const { isLoggedOut } = useAuthStore.getState()

        if (isLoggedOut) {
          return Promise.reject(err)
        }

        if (err.response?.status === 401) {
          try {
            const newToken = await refreshToken()
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              return instance(originalRequest)
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
          }

          useAuthStore.getState().setAuthState({
            isAuthenticated: false,
            user: null,
            isKeepLoggedIn: false,
            isLoggedOut: true,
          })
        }

        return Promise.reject(err)
      }
    )
  }

  return instance
}

const axiosInstance = createAxiosInstance({ withInterceptors: true })

export default axiosInstance
