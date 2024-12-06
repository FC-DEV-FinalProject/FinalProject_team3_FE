import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { checkNicknameDuplicate, checkPhoneDuplicate } from '@/shared/api/check-duplicate'
import { PATH } from '@/shared/constants/path'

import { signup } from '../../_api/signup'
import { SIGNUP_ERROR_MESSAGES } from '../../_constants/signup'
import { getUserTypeCookie, setNicknameCookie } from '../../_lib/cookies'
import {
  SignupFormDataModel,
  SignupFormErrorsModel,
  SignupFormModel,
  SignupFormStateModel,
} from './../../information/types'
import { validateSignupForm } from './../../information/utils'

const initialForm: SignupFormModel = {
  name: '',
  nickname: '',
  email: '',
  emailDomain: '',
  verificationCode: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  isMarketingAgreed: false,
}

const initialFormState: SignupFormStateModel = {
  isEmailVerified: false,
  isNicknameVerified: false,
  isEmailSent: false,
  isPhoneVerified: false,
}

const useSignupForm = () => {
  const router = useRouter()
  const [form, setForm] = useState<SignupFormModel>(initialForm)
  const [errors, setErrors] = useState<SignupFormErrorsModel>({})
  const [formState, setFormState] = useState<SignupFormStateModel>(initialFormState)
  const [isValidated, setIsValidated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (isValidated) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }

    if (name === 'nickname') {
      setFormState((prev) => ({
        ...prev,
        isNicknameVerified: false,
      }))
    }

    if (name === 'phone') {
      setFormState((prev) => ({
        ...prev,
        isPhoneVerified: false,
      }))
    }
  }

  const handleBirthdayChange = (value: string, field: 'birthYear' | 'birthMonth' | 'birthDay') => {
    setErrors((prev) => ({ ...prev, select: null }))
    setForm((prev) => ({ ...prev, [field]: String(value) }))
  }

  const handleMarketingAgree = (checked: boolean) => {
    setForm((prev) => ({ ...prev, isMarketingAgreed: checked }))
  }

  const handleNicknameCheck = async () => {
    setFormState((prev) => ({ ...prev, isNicknameVerified: false }))

    try {
      const response = await checkNicknameDuplicate(form.nickname)
      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isNicknameVerified: true }))
        if (errors.nickname) {
          setErrors((prev) => ({ ...prev, nickname: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_DUPLICATED }))
      }
    } catch (err) {
      console.error('닉네임 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.NICKNAME_CHECK_FAILED }))
    }
  }

  const handlePhoneCheck = async () => {
    try {
      const response = await checkPhoneDuplicate(form.phone)

      if (response.result.isAvailable) {
        setFormState((prev) => ({ ...prev, isPhoneVerified: true }))
        if (errors.phone) {
          setErrors((prev) => ({ ...prev, phone: null }))
        }
      } else {
        setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_DUPLICATED }))
      }
    } catch (err) {
      console.error('휴대폰 번호 중복 확인 실패:', err)
      setErrors((prev) => ({ ...prev, phone: SIGNUP_ERROR_MESSAGES.PHONE_CHECK_FAILED }))
    }
  }

  const handleFormSubmit = async () => {
    const formErrors = validateSignupForm(
      form,
      formState.isEmailVerified,
      formState.isNicknameVerified,
      formState.isPhoneVerified
    )
    setIsValidated(true)

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    const role = getUserTypeCookie()

    try {
      const formData: SignupFormDataModel = {
        name: form.name,
        nickname: form.nickname,
        phone: form.phone,
        password: form.password,
        email: form.email,
        role: role || 'INVESTOR',
        infoAgreement: form.isMarketingAgreed,
        birthYear: form.birthYear,
        birthMonth: form.birthMonth,
        birthDay: form.birthDay,
        code: form.verificationCode,
        emailDomain: form.emailDomain,
      }

      await signup(formData)
      setNicknameCookie(form.nickname)
      router.push(PATH.SIGN_UP_COMPLETE)
    } catch (err) {
      console.error('회원가입 실패:', err)
      setErrors((prev) => ({ ...prev, submitError: '회원가입에 실패했습니다.' }))
      setIsModalOpen(true)
    }
  }

  return {
    form,
    setForm,
    errors,
    setErrors,
    formState,
    setFormState,
    isValidated,
    handleInputChange,
    handleBirthdayChange,
    handleMarketingAgree,
    handleFormSubmit,
    handleNicknameCheck,
    handlePhoneCheck,
    isModalOpen,
    setIsModalOpen,
  }
}

export default useSignupForm
