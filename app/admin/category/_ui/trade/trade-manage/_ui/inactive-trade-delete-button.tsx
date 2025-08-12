'use client'

import { CSSProperties } from 'react'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'
import NotificationModal from '@/shared/ui/modal/notification-modal'

import useDeleteInactiveTrade from '../_hooks/query/use-delete-inactive-trade'

interface Props {
  tradeTypeId: number
}

const InactiveTradeDeleteButton = ({ tradeTypeId }: Props) => {
  const { closeModal, isModalOpen, openModal } = useModal()
  const {
    closeModal: closeErrorModal,
    isModalOpen: isErrorModalOpen,
    openModal: openErrorModal,
  } = useModal()
  const { mutate, isPending } = useDeleteInactiveTrade({
    tradeTypeId,
    options: {
      onError: () => {
        closeModal()
        openErrorModal()
      },
    },
  })

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
        message={`해당 매매유형을\n삭제하시겠습니까?`}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={mutate}
      />
      <NotificationModal
        message={`해당 매매유형은\n삭제할 수 없습니다.`}
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
      />
    </>
  )
}

const buttonStyles: CSSProperties = {
  height: '30px',
  padding: '7px 16px',
  margin: '15px 0',
}

export default InactiveTradeDeleteButton
