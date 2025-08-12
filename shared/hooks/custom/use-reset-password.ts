import { useCallback, useEffect, useRef, useState } from 'react'

import axios from 'axios'

import { useFindCredentials } from '@/shared/hooks/query/use-find-credentials'
import { isValidPassword } from '@/shared/utils/validation'

interface UseResetPasswordProps {
  onSuccess: (message: string) => void
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
  const [countdown, setCountdown] = useState(0)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const { authenticateMutation, resetPasswordMutation } = useFindCredentials()

  const memoizedOnError = useCallback(
    (message: string) => {
      onError(message)
    },
    [onError]
  )

  const memoizedOnSuccess = useCallback(
    (message: string) => {
      onSuccess(message)
    },
    [onSuccess]
  )

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (!isValidPassword(password)) {
      return {
        isValid: false,
        message: '비밀번호는 영문과 숫자를 포함한 6~20자리여야 합니다.',
      }
    }

    return { isValid: true, message: '' }
  }

  const startCountdown = useCallback((duration: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setCountdown(duration)

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          timerRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const handleVerifyEmail = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!formData.email || !formData.code) {
      memoizedOnError('이메일과 인증코드를 모두 입력해주세요.')
      return
    }

    try {
      const response = await authenticateMutation.mutateAsync({
        email: formData.email,
        code: formData.code,
      })

      if (response.isSuccess) {
        setIsEmailVerified(true)
        memoizedOnSuccess('이메일 인증에 성공했습니다.')
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        setCountdown(0)
      } else {
        setIsEmailVerified(false)
        memoizedOnError(response.message || '인증에 실패했습니다.')
      }
    } catch (error) {
      setIsEmailVerified(false)
      memoizedOnError('인증에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleNextStep = () => {
    if (!isEmailVerified) {
      memoizedOnError('이메일 인증을 먼저 진행해주세요.')
      return
    }
    setStep(2)
    memoizedOnSuccess('')
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validatePassword(formData.password)
    if (!validation.isValid) {
      memoizedOnError(validation.message)
      return
    }

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
        setIsPasswordReset(true)
        memoizedOnSuccess('비밀번호가 성공적으로 재설정되었습니다.')
      } else {
        memoizedOnError(response.message || '비밀번호 재설정에 실패했습니다.')
      }
    } catch (error) {
      memoizedOnError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.')
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
    if (!formData.email) {
      memoizedOnError('이메일을 입력해주세요.')
      return
    }

    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const response = await axios.get(`/api/users/authenticate?email=${formData.email}`, {
        signal: controller.signal,
      })

      if (response.data.isSuccess) {
        memoizedOnSuccess('인증코드가 발송되었습니다. 30분 내에 입력해주세요.')
        startCountdown(1800)
      } else {
        memoizedOnError(response.data.message || '인증코드 발송에 실패했습니다.')
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return
      }
      if (error.response && error.response.data && error.response.data.message) {
        memoizedOnError(error.response.data.message)
      } else {
        memoizedOnError('인증코드 발송에 실패했습니다.')
      }
    } finally {
      controllerRef.current = null
    }
  }, [formData.email, memoizedOnError, memoizedOnSuccess, startCountdown])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const isPending = authenticateMutation.isPending || resetPasswordMutation.isPending

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
    })
    setCountdown(0)
    setIsEmailVerified(false)
    setIsPasswordReset(false)

    if (controllerRef.current) {
      controllerRef.current.abort()
      controllerRef.current = null
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    memoizedOnSuccess('')
    memoizedOnError('')
    setStep(1)
  }, [memoizedOnSuccess, memoizedOnError])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  return {
    formData,
    step,
    isPending,
    countdown,
    formatCountdown,
    isEmailVerified,
    isPasswordReset,
    handleInputChange,
    handleRequestCode,
    handleVerifyEmail,
    handlePasswordReset,
    handleNextStep,
    resetForm,
  }
}
