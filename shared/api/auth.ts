import type { LoginFormDataModel, LoginResponseType } from '@/shared/types/auth'

import axiosInstance from './axios'

export const login = async (credentials: LoginFormDataModel): Promise<LoginResponseType> => {
  const response = await axiosInstance.post('/api/users/login', credentials)
  return response
}

export const refreshAccessToken = async (): Promise<LoginResponseType> => {
  const response = await axiosInstance.post('/api/users/reissue/refreshtoken')
  return response
}

export const logout = async () => {
  const response = await axiosInstance.post('/api/users/logout')
  return response
}
