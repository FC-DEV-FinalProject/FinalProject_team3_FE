import { ChangeEvent, useState } from 'react'

import { SIGNUP_ERROR_MESSAGES } from '@/app/(landing)/signup/_constants/signup'

import { checkNicknameDuplicate, checkPhoneDuplicate } from '@/shared/api/check-duplicate'
import { isValidNickname, isValidPassword, isValidPhone } from '@/shared/utils/validation'

import { ProfileModel } from '../../../_api/get-profile'
import {
  ProfileFormErrorsModel,
  ProfileFormModel,
  ProfileFormStateModel,
} from '../../_ui/user-info/types'

const initialFormState = {
  isNicknameVerified: false,
  isPhoneVerified: false,
  isPasswordVerified: false,
}

export const useProfileForm = (profile: ProfileModel) => {
  const initialForm: ProfileFormModel = {
    name: profile?.userName || '',
    nickname: profile?.nickname || '',
    email: profile?.email || '',
    password: '',
    passwordConfirm: '',
    phone: profile?.phone || '',
    birthDate: profile?.birthDate || '',
    joinDate: profile?.joinDate || '',
  }

  const [form, setForm] = useState<ProfileFormModel>(initialForm)
  const [formState, setFormState] = useState<ProfileFormStateModel>(initialFormState)
  const [errors, setErrors] = useState<ProfileFormErrorsModel>({})
  const [hasNicknameChanged, setHasNicknameChanged] = useState(false)
  const [hasPhoneChanged, setHasPhoneChanged] = useState(false)
  const [successMessages, setSuccessMessages] = useState<{ [key: string]: string | null }>({
    nickname: null,
    phone: null,
    password: null,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'nickname') {
      const isChanged = value !== profile?.nickname
      setHasNicknameChanged(isChanged)
      if (isChanged) {
        setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
        setSuccessMessages((prev) => ({ ...prev, nickname: null }))
        if (value && !isValidNickname(value)) {
          setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_LENGTH }))
        } else {
          setErrors((prev) => ({ ...prev, nickname: null }))
        }
      } else {
        setFormState((prev) => ({ ...prev, isNicknameVerified: true }))
        setErrors((prev) => ({ ...prev, nickname: null }))
      }
    }

    if (name === 'phone') {
      const isChanged = value !== profile?.phone
      setHasPhoneChanged(isChanged)
      if (isChanged) {
        setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
        setSuccessMessages((prev) => ({ ...prev, phone: null }))
        if (value && !isValidPhone(value)) {
          setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_INVALID }))
        } else {
          setErrors((prev) => ({ ...prev, phone: null }))
        }
      } else {
        setFormState((prev) => ({ ...prev, isPhoneVerified: true }))
        setErrors((prev) => ({ ...prev, phone: null }))
      }
    }

    if (name === 'password' || name === 'passwordConfirm') {
      setFormState((prev) => ({ ...prev, isPasswordVerified: false }))
      setSuccessMessages((prev) => ({ ...prev, password: null }))
      setErrors((prev) => ({ ...prev, password: null }))
    }
  }

  const handleNicknameCheck = async () => {
    if (!isValidNickname(form.nickname)) {
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_LENGTH }))
      return
    }

    try {
      const response = await checkNicknameDuplicate(form.nickname)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isNicknameVerified: true }))
        setErrors((prev) => ({ ...prev, nickname: null }))
        setSuccessMessages((prev) => ({ ...prev, nickname: '사용할 수 있는 닉네임입니다.' }))
      } else {
        setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
        setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_DUPLICATED }))
        setSuccessMessages((prev) => ({ ...prev, nickname: null }))
      }
    } catch (err) {
      console.error('닉네임 중복 확인 실패:', err)
      setFormState((prev) => ({ ...prev, isNicknameVerified: false }))
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_NOT_ALLOWED }))
      setSuccessMessages((prev) => ({ ...prev, nickname: null }))
    }
  }

  const handlePhoneCheck = async () => {
    if (!isValidPhone(form.phone)) {
      setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_INVALID }))
      return
    }

    try {
      const response = await checkPhoneDuplicate(form.phone)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isPhoneVerified: true }))
        setErrors((prev) => ({ ...prev, phone: null }))
        setSuccessMessages((prev) => ({ ...prev, phone: '사용할 수 있는 휴대폰 번호입니다.' }))
      } else {
        setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
        setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_DUPLICATED }))
        setSuccessMessages((prev) => ({ ...prev, phone: null }))
      }
    } catch (err) {
      console.error('휴대폰 번호 중복 확인 실패:', err)
      setFormState((prev) => ({ ...prev, isPhoneVerified: false }))
      setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_CHECK_FAILED }))
      setSuccessMessages((prev) => ({ ...prev, phone: null }))
    }
  }

  const handlePasswordCheck = () => {
    if (!form.password && !form.passwordConfirm) {
      setFormState((prev) => ({ ...prev, isPasswordVerified: true }))
      setErrors((prev) => ({ ...prev, password: null }))
      return
    }

    if (!form.password || !form.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        password: SIGNUP_ERROR_MESSAGES.PASSWORD_REQUIRED,
      }))
      setSuccessMessages((prev) => ({ ...prev, password: null }))
      return
    }

    if (!isValidPassword(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password: SIGNUP_ERROR_MESSAGES.PASSWORD_INVALID,
      }))
      setSuccessMessages((prev) => ({ ...prev, password: null }))
      return
    }

    if (form.password !== form.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        password: SIGNUP_ERROR_MESSAGES.PASSWORD_MISMATCH,
      }))
      setSuccessMessages((prev) => ({ ...prev, password: null }))
      return
    }

    setFormState((prev) => ({ ...prev, isPasswordVerified: true }))
    setErrors((prev) => ({ ...prev, password: null }))
    setSuccessMessages((prev) => ({ ...prev, password: '비밀번호가 확인되었습니다.' }))
  }

  const validateChangedFields = () => {
    const errors: ProfileFormErrorsModel = {}

    if (hasNicknameChanged) {
      if (!formState.isNicknameVerified) {
        errors.nickname = SIGNUP_ERROR_MESSAGES.NICKNAME_CHECK_REQUIRED
      }
    }

    if (hasPhoneChanged) {
      if (!formState.isPhoneVerified) {
        errors.phone = SIGNUP_ERROR_MESSAGES.PHONE_CHECK_REQUIRED
      }
    }

    if (form.password || form.passwordConfirm) {
      if (!formState.isPasswordVerified) {
        errors.password = SIGNUP_ERROR_MESSAGES.PASSWORD_REQUIRED
      }
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isFormValid = (isImageVerified: boolean) => {
    if (!hasNicknameChanged && !hasPhoneChanged && !form.password && !form.passwordConfirm) {
      return isImageVerified
    }

    if (hasNicknameChanged && !formState.isNicknameVerified) {
      return false
    }

    if (hasPhoneChanged && !formState.isPhoneVerified) {
      return false
    }

    if ((form.password || form.passwordConfirm) && !formState.isPasswordVerified) {
      return false
    }

    return true
  }

  const getUpdatedFields = () => {
    return {
      nickname: hasNicknameChanged ? form.nickname : null,
      phone: hasPhoneChanged ? form.phone : null,
      password: form.password || null,
      email: form.email,
    }
  }

  return {
    form,
    formState,
    errors,
    successMessages,
    hasNicknameChanged,
    hasPhoneChanged,
    handleInputChange,
    handleNicknameCheck,
    handlePhoneCheck,
    handlePasswordCheck,
    validateChangedFields,
    isFormValid,
    getUpdatedFields,
  }
}
