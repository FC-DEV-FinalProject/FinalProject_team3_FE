'use client'

import { CSSProperties } from 'react'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'

import useDeleteInactiveStock from '../_hooks/query/use-delete-inactive-stock'

interface Props {
  stockTypeId: number
}

const InactiveStockDeleteButton = ({ stockTypeId }: Props) => {
  const { mutate, isPending } = useDeleteInactiveStock(stockTypeId)
  const { closeModal, isModalOpen, openModal } = useModal()

  return (
    <>
      <Button
        size="small"
        onClick={openModal}
        disabled={isPending}
        variant="filled"
        style={buttonStyles}
      >
        삭제
      </Button>
      <AlertModal
        message={`해당 종목을\n삭제하시겠습니까?`}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={mutate}
      />
    </>
  )
}

const buttonStyles: CSSProperties = {
  height: '30px',
  padding: '7px 16px',
  margin: '15px 0',
}
export default InactiveStockDeleteButton
