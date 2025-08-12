'use client'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'

import useDeleteNotice from '../../_hook/query/use-delete-notice'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  noticeId: number
}

const NoticeDeleteButton = ({ noticeId }: Props) => {
  const { mutate, isPending } = useDeleteNotice(noticeId)
  const { closeModal, isModalOpen, openModal } = useModal()

  return (
    <>
      <Button
        size="small"
        onClick={openModal}
        disabled={isPending}
        variant="filled"
        className={cx('button')}
      >
        삭제
      </Button>
      <AlertModal
        message={`해당 공지를\n삭제하시겠습니까?`}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={mutate}
      />
    </>
  )
}

export default NoticeDeleteButton
