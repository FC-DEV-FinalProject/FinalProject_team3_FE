import { Dispatch, SetStateAction, useState } from 'react'

import { checkEmailDuplicate } from '@/shared/api/check-duplicate'

import { getEmailAuthenticationResult, requestEmailAuthentication } from '../../_api/email-auth'
import { SIGNUP_ERROR_MESSAGES } from '../../_constants/signup'
import {
  SignupFormErrorsModel,
  SignupFormModel,
  SignupFormStateModel,
} from './../../information/types'

interface Props {
  form: SignupFormModel
  errors: SignupFormErrorsModel
  isValidated: boolean
  setForm: Dispatch<SetStateAction<SignupFormModel>>
  setErrors: Dispatch<SetStateAction<SignupFormErrorsModel>>
  setFormState: Dispatch<SetStateAction<SignupFormStateModel>>
}

const useSignupEmail = ({ form, errors, isValidated, setForm, setErrors, setFormState }: Props) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('')

  const handleEmailChange = (name: string) => {
    if (name === 'emailDomain') {
      setSelectedDomain('')
    }

    setFormState((prev) => ({
      ...prev,
      isEmailVerified: false,
      isEmailSent: false,
    }))
  }

  const handleDomainSelect = (value: string) => {
    if (typeof value === 'string') {
      setSelectedDomain(value)
      setForm((prev) => ({ ...prev, emailDomain: value !== '' ? value : '' }))

      if (isValidated) {
        setErrors((prev) => ({ ...prev, email: null }))
      }

      setFormState((prev) => ({
        ...prev,
        isEmailVerified: false,
        isEmailSent: false,
      }))
    }
  }

  const handleEmailVerification = async () => {
    try {
      const response = await checkEmailDuplicate(form.email, form.emailDomain)

      if (!response.result.isAvailable) {
        setErrors((prev) => ({ ...prev, email: SIGNUP_ERROR_MESSAGES.EMAIL_DUPLICATED }))
        return
      }

      await requestEmailAuthentication(form.email, form.emailDomain)
      setFormState((prev) => ({ ...prev, isEmailSent: true }))

      if (errors.email) {
        setErrors((prev) => ({ ...prev, email: null }))
      }
    } catch (err) {
      console.error('이메일 인증 발송 실패:', err)
      setErrors((prev) => ({ ...prev, email: SIGNUP_ERROR_MESSAGES.EMAIL_SEND_FAILED }))
    }
  }

  const handleVerificationCodeCheck = async () => {
    try {
      const response = await getEmailAuthenticationResult(
        form.email,
        form.emailDomain,
        form.verificationCode
      )

      if (response.isSuccess) {
        setFormState((prev) => ({ ...prev, isEmailVerified: true }))
        if (errors.emailConfirm) {
          setErrors((prev) => ({ ...prev, emailConfirm: null }))
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          emailConfirm: SIGNUP_ERROR_MESSAGES.VERIFICATION_CODE_MISMATCH,
        }))
      }
    } catch (err) {
      console.error('인증번호 확인 실패:', err)
      setErrors((prev) => ({
        ...prev,
        emailConfirm: SIGNUP_ERROR_MESSAGES.VERIFICATION_CODE_CHECK_FAILED,
      }))
    }
  }

  return {
    selectedDomain,
    handleEmailChange,
    handleDomainSelect,
    handleEmailVerification,
    handleVerificationCodeCheck,
  }
}

export default useSignupEmail
