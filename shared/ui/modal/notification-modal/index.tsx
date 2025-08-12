'use client'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'

import styles from '../styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isOpen: boolean
  message: string
  onClose: () => void
}

const NotificationModal = ({ isOpen, message, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>{message}</span>
      <div className={cx('two-button')}>
        <Button onClick={onClose}>닫기</Button>
      </div>
    </Modal>
  )
}

export default NotificationModal
