'use client'

import React from 'react'

import { ModalAlertIcon, ModalSubscribeIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  isSubscribing: boolean
  onCloseModal: () => void
  onChange?: () => void
}

const SubscribeCheckModal = ({ isModalOpen, isSubscribing, onCloseModal, onChange }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={isSubscribing ? ModalAlertIcon : ModalSubscribeIcon}>
      {isSubscribing ? (
        <>
          <span className={cx('message')}>구독을 취소하시겠습니까?</span>
          <div className={cx('two-button')}>
            <Button onClick={onCloseModal}>아니오</Button>
            <Button onClick={onChange} variant="filled" className={cx('button')}>
              예
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className={cx('message')}>
            전략을 구독합니다 <br />
            구독한 전략은 나의 관심전략 <br />
            페이지에서 확인 가능합니다.
          </span>
          <Button onClick={onChange}>닫기</Button>
        </>
      )}
    </Modal>
  )
}

export default SubscribeCheckModal
