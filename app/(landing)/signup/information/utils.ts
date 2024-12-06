import {
  isValidEmail,
  isValidName,
  isValidNickname,
  isValidPassword,
  isValidPhone,
} from '@/shared/utils/validation'

import { SIGNUP_ERROR_MESSAGES } from '../_constants/signup'
import { SignupErrorMessageType, SignupFormModel } from './types'

type ValidationFieldType = keyof typeof SIGNUP_ERROR_MESSAGES

const validateField = (field: string, value: string): SignupErrorMessageType | null => {
  if (!value.trim()) {
    return SIGNUP_ERROR_MESSAGES[`${field}_REQUIRED` as ValidationFieldType] || null
  }

  switch (field) {
    case 'NAME':
      return isValidName(value) ? null : SIGNUP_ERROR_MESSAGES.NAME_MIN_LENGTH
    case 'NICKNAME':
      return isValidNickname(value) ? null : SIGNUP_ERROR_MESSAGES.NICKNAME_LENGTH
    case 'PASSWORD':
      return isValidPassword(value) ? null : SIGNUP_ERROR_MESSAGES.PASSWORD_INVALID
    case 'PHONE':
      return isValidPhone(value) ? null : SIGNUP_ERROR_MESSAGES.PHONE_INVALID
    default:
      return null
  }
}

export const validateEmail = (emailId: string, domain: string): SignupErrorMessageType | null => {
  if (!emailId.trim() || !domain.trim()) {
    return SIGNUP_ERROR_MESSAGES.EMAIL_REQUIRED
  }

  const fullEmail = `${emailId}@${domain}`
  return isValidEmail(fullEmail) ? null : SIGNUP_ERROR_MESSAGES.EMAIL_INVALID
}

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): SignupErrorMessageType | null => {
  if (!confirmPassword.trim()) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD_REQUIRED
  }
  return password === confirmPassword ? null : SIGNUP_ERROR_MESSAGES.PASSWORD_MISMATCH
}

export const validateSignupForm = (
  form: SignupFormModel,
  isEmailVerified: boolean,
  isNicknameVerified: boolean,
  isPhoneVerified: boolean
): Record<string, SignupErrorMessageType> => {
  const errors: Record<string, SignupErrorMessageType> = {}

  const nameError = validateField('NAME', form.name)
  if (nameError) errors.name = nameError

  const nicknameError = validateField('NICKNAME', form.nickname)
  if (nicknameError) errors.nickname = nicknameError
  else if (!isNicknameVerified) errors.nickname = SIGNUP_ERROR_MESSAGES.NICKNAME_CHECK_REQUIRED

  const emailError = validateEmail(form.email, form.emailDomain)
  if (emailError) errors.email = emailError
  else if (!isEmailVerified) errors.email = SIGNUP_ERROR_MESSAGES.EMAIL_CHECK_REQUIRED

  const passwordError = validateField('PASSWORD', form.password)
  if (passwordError) errors.password = passwordError

  const passwordMatchError = validatePasswordMatch(form.password, form.passwordConfirm)
  if (passwordMatchError) errors.passwordConfirm = passwordMatchError

  const phoneError = validateField('PHONE', form.phone)
  if (phoneError) errors.phone = phoneError
  if (!isPhoneVerified) errors.phone = SIGNUP_ERROR_MESSAGES.PHONE_CHECK_REQUIRED

  if (!form.birthYear || !form.birthMonth || !form.birthDay) {
    errors.select = SIGNUP_ERROR_MESSAGES.SELECT_REQUIRED
  }

  return errors
}

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }))
}

export const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0')
    return {
      value: month,
      label: `${month}월`,
    }
  })
}

export const generateDayOptions = () => {
  return Array.from({ length: 31 }, (_, i) => {
    const day = String(i + 1).padStart(2, '0')
    return {
      value: day,
      label: `${day}일`,
    }
  })
}
