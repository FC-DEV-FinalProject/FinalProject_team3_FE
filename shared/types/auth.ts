import { AxiosResponse } from 'axios'

export type UserType = 'TRADER' | 'INVESTOR'
export type RoleType = UserType | `${UserType}_ADMIN`

export interface UserModel {
  userId: number
  userName: string
  email: string
  imageUrl: string
  nickname: string
  phone: string
  infoAgreement: boolean
  role: RoleType
}

export interface LoginResponseModel {
  isSuccess: boolean
  message: string
  email: string
}

export interface LoginFormDataModel {
  email: string
  password: string
}

export interface TokenDataModel {
  accessToken: string
  refreshToken: string
}

export interface ApiResponseModel<T> {
  isSuccess: boolean
  message: string
  data: T
  code?: string
}

export type LoginResponseType = AxiosResponse<LoginResponseModel>
export type TokenResponseType = ApiResponseModel<TokenDataModel>

export interface TokenPayloadModel {
  category: string
  email: string
  role: RoleType
  exp: number
  iat: number
}

export interface TokenStatusModel {
  isValid: boolean
  timeUntilExpiry: number
  isNearExpiry: boolean
}

export const isAdmin = (user: UserModel | null): boolean => {
  if (!user) return false
  return user.role.includes('ADMIN')
}

export const isSuperAdmin = (user: UserModel | null): boolean => {
  if (!user) return false
  return user.role.includes('SUPER_ADMIN')
}

export const isTrader = (user: UserModel | null): boolean => {
  if (!user) return false
  return user.role.includes('TRADER')
}
