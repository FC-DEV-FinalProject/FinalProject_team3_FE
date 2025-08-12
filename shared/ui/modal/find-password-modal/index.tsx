'use client'

import { useEffect } from 'react'
import { useState } from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { useResetPassword } from '@/shared/hooks/custom/use-reset-password'
import { Button } from '@/shared/ui/button'
import Input from '@/shared/ui/input'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isOpen: boolean
  onClose: () => void
}

const FindPasswordModal = ({ isOpen, onClose }: Props) => {
  const [notice, setNotice] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const {
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
  } = useResetPassword({
    onSuccess: (message) => {
      setNotice(message)
      setIsSuccess(true)
    },
    onError: (message) => {
      setNotice(message)
      setIsSuccess(false)
    },
  })

  useEffect(() => {
    if (!isOpen) {
      resetForm()
      setNotice('')
      setIsSuccess(false)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      icon={ModalAlertIcon}
      message="비밀번호 재설정"
      className={cx('container')}
    >
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleNextStep()
          }}
          className={cx('form')}
        >
          <p className={cx('explanation')}>본인 인증을 위해 가입한 이메일 주소를 입력해주세요.</p>
          <div className={cx('input-group')}>
            <label>이메일 주소</label>
            <div className={cx('input-button-group')}>
              <Input
                type="email"
                name="email"
                className={cx('input')}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                disabled={isPending || isEmailVerified}
                required
              />
              <Button
                type="button"
                onClick={handleRequestCode}
                disabled={isPending || !formData.email || isEmailVerified}
                variant="filled"
              >
                인증
              </Button>
            </div>
          </div>
          <div className={cx('input-group')}>
            <label>인증번호</label>
            <div className={cx('input-button-group')}>
              <Input
                type="text"
                name="code"
                className={cx('input')}
                value={formData.code}
                onChange={handleInputChange}
                placeholder="인증번호를 입력하세요"
                disabled={isPending || isEmailVerified}
                required
              />
              <Button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isPending || !formData.code || isEmailVerified}
                variant="outline"
              >
                확인
              </Button>
            </div>
            {countdown > 0 && !isEmailVerified && (
              <p className={cx('countdown')}>인증 코드 유효시간: {formatCountdown()}</p>
            )}
          </div>

          {notice && (
            <p className={cx('notice', { success: isSuccess, error: !isSuccess })}>{notice}</p>
          )}

          <div className={cx('buttons')}>
            <Button type="button" onClick={onClose} variant="outline">
              닫기
            </Button>
            <Button
              type="submit"
              disabled={isPending || !formData.email || !formData.code || !isEmailVerified}
              variant="filled"
            >
              다음
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePasswordReset} className={cx('form')}>
          <p className={cx('explanation')}>새로운 비밀번호를 설정합니다.</p>
          <div className={cx('input-group')}>
            <label>새 비밀번호</label>
            <Input
              type="password"
              name="password"
              className={cx('input')}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="새 비밀번호를 입력하세요"
              disabled={isPending || isPasswordReset}
              required
            />
            <p className={cx('password-guide')}>* 영문과 숫자를 포함한 6~20자로 입력해주세요.</p>
          </div>
          <div className={cx('input-group')}>
            <label>비밀번호 확인</label>
            <Input
              type="password"
              name="passwordConfirm"
              className={cx('input')}
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
              disabled={isPending || isPasswordReset}
              required
            />
          </div>

          {notice && (
            <p className={cx('notice', { success: isSuccess, error: !isSuccess })}>{notice}</p>
          )}

          <div className={cx('buttons')}>
            {isPasswordReset ? (
              <Button type="button" onClick={onClose} variant="filled">
                닫기
              </Button>
            ) : (
              <>
                <Button type="button" onClick={onClose} variant="outline">
                  닫기
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || !formData.password || !formData.passwordConfirm}
                  variant="filled"
                >
                  재설정
                </Button>
              </>
            )}
          </div>
        </form>
      )}
    </Modal>
  )
}

export default FindPasswordModal
