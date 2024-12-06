'use client'

import React from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import Modal from '..'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface SessionExtensionModalProps {
  isModalOpen: boolean
  onCloseModal: () => void
  onExtend: () => void
  minutesLeft: number
}

const SessionExtensionModal = ({
  isModalOpen,
  onCloseModal,
  onExtend,
  minutesLeft,
}: SessionExtensionModalProps) => {
  const getMessage = () => {
    if (minutesLeft > 0) {
      return `${minutesLeft}분 후에 자동 로그아웃됩니다.`
    }
    return '잠시 후 자동 로그아웃됩니다.'
  }

  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>
        세션이 곧 만료됩니다.
        <br />
        {getMessage()}
        <br />
        로그인을 연장하시겠습니까?
      </span>
      <div className={cx('two-button')}>
        <Button onClick={onCloseModal}>아니오</Button>
        <Button onClick={onExtend} variant="filled" className={cx('button')}>
          예
        </Button>
      </div>
    </Modal>
  )
}

export default SessionExtensionModal
