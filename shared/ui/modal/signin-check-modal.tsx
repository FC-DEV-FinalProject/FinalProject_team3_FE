'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const SigninCheckModal = ({ isModalOpen, onCloseModal }: Props) => {
  const router = useRouter()

  const handleRouter = () => {
    router.push(PATH.SIGN_IN)
  }

  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>
        로그인이 필요합니다. <br /> 로그인 하시겠습니까?
      </span>
      <div className={cx('two-button')}>
        <Button onClick={onCloseModal}>아니오</Button>
        <Button onClick={handleRouter} variant="filled" className={cx('button')}>
          예
        </Button>
      </div>
    </Modal>
  )
}

export default SigninCheckModal
