import axios from 'axios'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { getUserFromToken, isTokenExpired, refreshToken } from '@/shared/utils/token-utils'

export const createAxiosInstance = (options: { withInterceptors?: boolean } = {}) => {
  const instance = axios.create()

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
          const isAdmin = user?.role === 'admin'

          if (isAdmin && isTokenExpired(accessToken)) {
            useAuthStore.getState().setAuthState({
              isAuthenticated: false,
              user: null,
              isKeepLoggedIn: false,
              isLoggedOut: true,
            })
            return config
          }

          config.headers.Authorization = `Bearer ${accessToken}`
        } catch (error) {
          console.error('토큰 디코딩 실패:', error)
          useAuthStore.getState().setAuthState({
            isAuthenticated: false,
            user: null,
            isKeepLoggedIn: false,
            isLoggedOut: true,
          })
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (!error.config) return Promise.reject(error)

        const originalRequest = error.config
        const { isLoggedOut } = useAuthStore.getState()

        if (isLoggedOut) {
          return Promise.reject(error)
        }

        if (error.response?.status === 401) {
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

        return Promise.reject(error)
      }
    )
  }

  return instance
}

const axiosInstance = createAxiosInstance({ withInterceptors: true })

export default axiosInstance
