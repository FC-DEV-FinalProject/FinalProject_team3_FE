import { SIGNUP_ERROR_MESSAGES } from '@/app/(landing)/signup/_constants/signup'

export type ProfileErrorMessageType =
  (typeof SIGNUP_ERROR_MESSAGES)[keyof typeof SIGNUP_ERROR_MESSAGES]

export interface ProfileFormModel {
  name: string
  nickname: string
  email: string
  password: string
  passwordConfirm: string
  phone: string
  birthDate: string
  joinDate: string
}

export interface ProfileFormStateModel {
  isNicknameVerified: boolean
  isPhoneVerified: boolean
  isPasswordVerified: boolean
}

export interface ProfileFormErrorsModel {
  nickname?: ProfileErrorMessageType | null
  password?: ProfileErrorMessageType | null
  passwordConfirm?: ProfileErrorMessageType | null
  phone?: ProfileErrorMessageType | null
}

export interface UserProfileModel {
  nickName: string
  phoneNum: string
  password?: string
  email: string
  imageChange: boolean
}

export interface ProfileModel {
  userName: string
  nickname: string
  email: string
  phone: string
  birthDate: string
  profileImage?: string | null
}
