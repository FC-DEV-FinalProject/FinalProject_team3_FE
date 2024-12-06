'use client'

import { useEffect } from 'react'
import { useState } from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { useFindCredentials } from '@/shared/hooks/query/use-find-credentials'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isOpen: boolean
  onClose: () => void
}

const FindEmailModal = ({ isOpen, onClose }: Props) => {
  const [phone, setPhone] = useState('')
  const [foundEmail, setFoundEmail] = useState('')
  const [error, setError] = useState('')

  const { findEmailMutation } = useFindCredentials()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await findEmailMutation.mutateAsync(phone)
      if (response.isSuccess && response.result.isFound) {
        setFoundEmail(response.result.email)
        setError('')
      } else {
        setError('해당 전화번호로 등록된 이메일을 찾을 수 없습니다.')
      }
    } catch {
      setError('이메일 찾기에 실패했습니다.')
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setPhone('')
      setFoundEmail('')
      setError('')
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} icon={ModalAlertIcon} message="이메일 찾기">
      <form onSubmit={handleSubmit} className={cx('form')}>
        <p className={cx('explanation')}>
          가입 이메일 주소를 찾기 위해
          <br /> 회원가입 시 입력한 휴대전화 번호를 입력해주세요.
        </p>
        <div className={cx('input-group')}>
          <label>휴대전화</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="휴대전화 번호를 입력하세요"
            disabled={findEmailMutation.isPending}
            required
          />
        </div>
        {error && <p className={cx('error')}>{error}</p>}
        {foundEmail && <p className={cx('success')}>찾은 이메일: {foundEmail}</p>}
        <div className={cx('buttons')}>
          <Button type="button" onClick={onClose} variant="outline">
            닫기
          </Button>
          <Button type="submit" disabled={findEmailMutation.isPending} variant="filled">
            확인
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FindEmailModal
