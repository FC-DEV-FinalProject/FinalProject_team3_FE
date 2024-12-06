import { useCallback, useState } from 'react'

import axios from 'axios'

import { useFindCredentials } from '@/shared/hooks/query/use-find-credentials'

interface UseResetPasswordProps {
  onSuccess: () => void
  onError: (message: string) => void
}

export const useResetPassword = ({ onSuccess, onError }: UseResetPasswordProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    passwordConfirm: '',
  })

  const { authenticateMutation, resetPasswordMutation } = useFindCredentials()

  const memoizedOnError = useCallback(
    (message: string) => {
      onError(message)
    },
    [onError]
  )

  const memoizedOnSuccess = useCallback(() => {
    onSuccess()
  }, [onSuccess])

  const handleVerifyEmail = async (e?: React.FormEvent) => {
    e?.preventDefault()
    try {
      const response = await authenticateMutation.mutateAsync({
        email: formData.email,
        code: formData.code,
      })
      if (response.isSuccess) {
        setStep(2)
        memoizedOnError('')
      } else {
        memoizedOnError(response.message || '인증에 실패했습니다.')
      }
    } catch {
      memoizedOnError('인증에 실패했습니다.')
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.passwordConfirm) {
      memoizedOnError('비밀번호가 일치하지 않습니다.')
      return
    }
    try {
      const response = await resetPasswordMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      })
      if (response.isSuccess) {
        memoizedOnSuccess()
      } else {
        memoizedOnError(response.message || '비밀번호 재설정에 실패했습니다.')
      }
    } catch {
      memoizedOnError('비밀번호 재설정에 실패했습니다.')
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleRequestCode = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/authenticate?email=${formData.email}`)
      if (response.data.isSuccess) {
        memoizedOnError('')
      } else {
        memoizedOnError(response.data.message || '인증코드 발송에 실패했습니다.')
      }
    } catch {
      memoizedOnError('인증코드 발송에 실패했습니다.')
    }
  }, [formData.email, memoizedOnError])

  const isPending = authenticateMutation.isPending || resetPasswordMutation.isPending

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
    })
  }, [])

  return {
    formData,
    step,
    isPending,
    handleInputChange,
    handleRequestCode,
    handleVerifyEmail,
    handlePasswordReset,
    setStep,
    resetForm,
  }
}
