'use client'

import { useCallback, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'

import { AxiosError } from 'axios'
import classNames from 'classnames/bind'

import { ERROR_MESSAGES } from '@/shared/constants/error-messages'
import { PATH } from '@/shared/constants/path'
import useModal from '@/shared/hooks/custom/use-modal'
import { useLoginMutation } from '@/shared/hooks/query/auth-queries'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import type { LoginFormDataModel } from '@/shared/types/auth'
import { Button } from '@/shared/ui/button'
import Checkbox from '@/shared/ui/check-box'
import { Input } from '@/shared/ui/input'
import FindEmailModal from '@/shared/ui/modal/find-email-modal'
import FindPasswordModal from '@/shared/ui/modal/find-password-modal'
import { validate } from '@/shared/utils/validation'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const SignInPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loginMutation = useLoginMutation()
  const setKeepLoggedIn = useAuthStore((state) => state.setKeepLoggedIn)
  const isKeepLoggedIn = useAuthStore((state) => state.isKeepLoggedIn)

  const {
    isModalOpen: isFindEmailOpen,
    openModal: handleFindEmailOpen,
    closeModal: handleFindEmailClose,
  } = useModal()
  const {
    isModalOpen: isFindPasswordOpen,
    openModal: handleFindPasswordOpen,
    closeModal: handleFindPasswordClose,
  } = useModal()

  const [formData, setFormData] = useState<LoginFormDataModel>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const emailError = validate('EMAIL', formData.email)
    if (emailError) {
      setErrors(emailError)
      return false
    }

    const passwordError = validate('PASSWORD', formData.password)
    if (passwordError) {
      setErrors(passwordError)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors(null)

    try {
      const response = await loginMutation.mutateAsync(formData)

      if (!response.data.isSuccess) {
        setErrors(response.data.message || ERROR_MESSAGES.AUTH.LOGIN_FAILED)
        return
      }

      const returnUrl = searchParams.get('returnUrl')
      if (returnUrl) {
        try {
          const url = new URL(returnUrl, window.location.origin)
          if (url.origin === window.location.origin) {
            router.replace(returnUrl)
            return
          }
        } catch (err) {
          console.error('Invalid return URL:', err)
        }
      }

      router.replace(PATH.STRATEGIES)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          setErrors(err.response.data.message)
        } else {
          setErrors(ERROR_MESSAGES.NETWORK.ERROR)
        }
      } else {
        setErrors(ERROR_MESSAGES.AUTH.LOGIN_FAILED)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleKeepLoggedInChange = useCallback(
    (checked: boolean) => {
      setKeepLoggedIn(checked)
    },
    [setKeepLoggedIn]
  )

  const handleFindButtonClick = (e: React.MouseEvent, handler: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    handler()
  }

  const isFormDisabled = isSubmitting || loginMutation.isPending

  return (
    <div className={cx('container')}>
      <div className={cx('loginBox')}>
        <h1 className={cx('title')}>로그인</h1>
        <form onSubmit={handleSubmit} className={cx('form')}>
          <div className={cx('inputGroup')}>
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              inputSize="large"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요."
              className={cx('input')}
              disabled={isFormDisabled}
              required
              autoComplete="email"
            />
          </div>
          <div className={cx('inputGroup')}>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              inputSize="large"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요."
              className={cx('input')}
              disabled={isFormDisabled}
              required
              autoComplete="current-password"
            />
          </div>
          <div className={cx('error-container')}>
            <p
              className={cx('error-message', {
                visible: errors,
              })}
              role="alert"
            >
              {errors}
            </p>
          </div>
          <div className={cx('options')}>
            <label className={cx('remember')}>
              <Checkbox
                isChecked={isKeepLoggedIn}
                onChange={handleKeepLoggedInChange}
                label="로그인 유지"
                textColor="gray600"
              />
            </label>
            <div className={cx('find-buttons')}>
              <button
                onClick={(e) => handleFindButtonClick(e, handleFindEmailOpen)}
                className={cx('find-button')}
                type="button"
              >
                아이디 찾기
              </button>
              <span className={cx('divider')}>|</span>
              <button
                onClick={(e) => handleFindButtonClick(e, handleFindPasswordOpen)}
                className={cx('find-button')}
                type="button"
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
          <Button type="submit" size="large" variant="filled" disabled={isFormDisabled}>
            로그인
          </Button>
          <Button
            type="button"
            size="large"
            onClick={() => router.push(PATH.SIGN_UP_USER_TYPE)}
            disabled={isFormDisabled}
          >
            회원가입
          </Button>
        </form>
      </div>

      <FindEmailModal isOpen={isFindEmailOpen} onClose={handleFindEmailClose} />
      <FindPasswordModal isOpen={isFindPasswordOpen} onClose={handleFindPasswordClose} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SignInPage), {
  ssr: false,
})
