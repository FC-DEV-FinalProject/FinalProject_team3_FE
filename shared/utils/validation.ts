import { ERROR_MESSAGES } from '@/shared/constants/error-messages'

const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
  PHONE: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
  NAME: /^.{2,}$/,
  NICKNAME: /^.{2,10}$/,
} as const

export const isValidEmail = (email: string): boolean => {
  return PATTERNS.EMAIL.test(email)
}

export const isValidPassword = (password: string): boolean => {
  return PATTERNS.PASSWORD.test(password)
}

export const isValidPhone = (phone: string): boolean => {
  return PATTERNS.PHONE.test(phone)
}

export const isValidName = (name: string): boolean => {
  return PATTERNS.NAME.test(name)
}

export const isValidNickname = (nickname: string): boolean => {
  return PATTERNS.NICKNAME.test(nickname)
}

const validators = {
  EMAIL: isValidEmail,
  PASSWORD: isValidPassword,
  PHONE: isValidPhone,
} as const

export const validate = (name: keyof typeof validators, value: string): string | null => {
  if (!value.trim()) {
    return ERROR_MESSAGES.FORM.REQUIRED_FIELDS
  }

  if (!validators[name](value)) {
    return ERROR_MESSAGES.FORM[name]
  }

  return null
}
