import React from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const SubscribeWarningModal = ({ isModalOpen, onCloseModal }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>나의 전략은 구독 할 수 없습니다.</span>
      <Button onClick={onCloseModal}>확인</Button>
    </Modal>
  )
}

export default SubscribeWarningModal
