'use client'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'

import styles from '../styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  message: string
  disabled?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const AlertModal = ({ isModalOpen, message, disabled, onConfirm, onCancel }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>{message}</span>
      <div className={cx('two-button')}>
        <Button onClick={onCancel}>아니오</Button>
        <Button onClick={onConfirm} disabled={disabled} variant="filled" className={cx('button')}>
          예
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
