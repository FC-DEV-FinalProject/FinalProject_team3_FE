import axios from 'axios'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '@/shared/lib/auth-tokens'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { isTokenExpired, refreshToken } from '@/shared/utils/token-utils'

export const createAxiosInstance = (options: { withInterceptors?: boolean } = {}) => {
  const instance = axios.create({
    withCredentials: true,
  })

  if (options.withInterceptors && typeof window !== 'undefined') {
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const { user, setAuthState } = useAuthStore.getState()
        const accessToken = getAccessToken()

        if (!user || !accessToken) {
          return config
        }

        try {
          if (isTokenExpired(accessToken)) {
            setAuthState({
              isAuthenticated: false,
              user: null,
            })
            return config
          }

          config.headers['access-token'] = `Bearer ${accessToken}`
          return config
        } catch (err) {
          console.error('Token validation failed:', err)
          setAuthState({
            isAuthenticated: false,
            user: null,
          })
          return config
        }
      },
      (err) => Promise.reject(err)
    )

    instance.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        if (!err.config) return Promise.reject(err)

        const { user } = useAuthStore.getState()

        if (!user) {
          return Promise.reject(err)
        }

        const originalRequest = err.config

        if (err.response?.status === 401) {
          try {
            const newToken = await refreshToken()
            if (newToken) {
              originalRequest.headers['access-token'] = `Bearer ${newToken}`
              return instance(originalRequest)
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
          }

          useAuthStore.getState().setAuthState({
            isAuthenticated: false,
            user: null,
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
