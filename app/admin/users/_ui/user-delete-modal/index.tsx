'use client'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'
import styles from '@/shared/ui/modal/styles.module.scss'

import useDeleteUser from '../../_hooks/query/use-delete-user'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  userId: number
  closeModal: () => void
  onConfirm?: () => void
}

const UserDeleteModal = ({ isModalOpen, userId, closeModal }: Props) => {
  const { mutate, isPending } = useDeleteUser(userId)

  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>회원을 탈퇴시키겠습니까?</span>
      <div className={cx('two-button')}>
        <Button onClick={closeModal}>아니오</Button>
        <Button
          onClick={() => {
            mutate()
            closeModal()
          }}
          disabled={isPending}
          variant="filled"
          className={cx('button')}
        >
          예
        </Button>
      </div>
    </Modal>
  )
}

export default UserDeleteModal
