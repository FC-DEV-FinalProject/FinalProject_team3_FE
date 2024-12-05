import axios from 'axios'

interface FindEmailResponseModel {
  isSuccess: boolean
  message: string
  result: {
    isFound: boolean
    email: string
  }
  code: number
}

interface AuthenticateResponseModel {
  isSuccess: boolean
  message: string
  result: Record<string, unknown>
  code: number
}

interface ResetPasswordResponseModel {
  isSuccess: boolean
  message: string
  result: Record<string, unknown>
  code: number
}

export const findCredentialsAPI = {
  findEmail: async (phone: string) => {
    const response = await axios.get<FindEmailResponseModel>(`/api/users/email?phone=${phone}`)
    return response.data
  },

  authenticate: async (email: string, code: string) => {
    const response = await axios.post<AuthenticateResponseModel>('/api/users/authenticate', {
      email,
      code,
    })
    return response.data
  },

  resetPassword: async (email: string, password: string) => {
    const response = await axios.patch<ResetPasswordResponseModel>('/api/users/reissue/password', {
      email,
      password,
    })
    return response.data
  },
}
