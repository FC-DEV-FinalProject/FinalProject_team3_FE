'use client'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import AlertModal from '@/shared/ui/modal/alert-modal'

import useDeleteUser from '../_hooks/query/use-delete-user'

interface Props {
  userId: number
}

const UserDeleteButton = ({ userId }: Props) => {
  const { closeModal, isModalOpen, openModal } = useModal()
  const { mutate, isPending } = useDeleteUser(userId)

  return (
    <>
      <Button variant="filled" onClick={openModal} size="small" style={{ padding: '7px 16px' }}>
        강제탈퇴
      </Button>
      <AlertModal
        message={`해당 회원을\n탈퇴시키겠습니까?`}
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

export default UserDeleteButton
