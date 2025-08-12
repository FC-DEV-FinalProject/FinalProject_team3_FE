'use client'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  onConfirm: () => void
}

const WithdrawCheckModal = ({ isModalOpen, onCloseModal, onConfirm }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>
        정말 탈퇴하시겠습니까?
        <br />
        탈퇴 시 모든 정보가 삭제됩니다.
      </span>
      <div className={cx('two-button')}>
        <Button onClick={onCloseModal}>아니오</Button>
        <Button onClick={onConfirm} variant="filled" className={cx('button')}>
          예
        </Button>
      </div>
    </Modal>
  )
}

export default WithdrawCheckModal
