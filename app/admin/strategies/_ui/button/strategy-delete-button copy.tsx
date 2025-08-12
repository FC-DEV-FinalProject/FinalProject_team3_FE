'use client'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'

import useDeleteAdminStrategy from '../../_hooks/query/use-admin-delete-strategy'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
}

const StrategyDeleteButton = ({ strategyId }: Props) => {
  const { mutate, isPending } = useDeleteAdminStrategy(strategyId)
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
        message={`해당 전략을\n삭제하시겠습니까?`}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={mutate}
      />
    </>
  )
}

export default StrategyDeleteButton
