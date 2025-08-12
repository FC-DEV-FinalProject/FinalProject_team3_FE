'use client'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'

import useDeleteQuestion from '../../_hooks/query/use-delete-question'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)
interface Props {
  questionId: number
  strategyId: number
}
const AdminQuestionDeleteButton = ({ questionId, strategyId }: Props) => {
  const { mutate, isPending } = useDeleteQuestion({ strategyId, questionId })
  const { closeModal, isModalOpen, openModal } = useModal()

  return (
    <>
      <Button
        variant="filled"
        onClick={openModal}
        size="small"
        style={{ padding: '7px 16px' }}
        className={cx('button')}
      >
        삭제
      </Button>
      <AlertModal
        message={`해당 문의내역을\n삭제하시겠습니까?`}
        isModalOpen={isModalOpen}
        disabled={isPending}
        onCancel={closeModal}
        onConfirm={() => {
          mutate()
        }}
      />
    </>
  )
}
export default AdminQuestionDeleteButton
