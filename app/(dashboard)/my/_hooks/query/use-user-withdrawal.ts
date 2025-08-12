import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { PATH } from '@/shared/constants/path'
import { useAuth } from '@/shared/hooks/custom/use-auth'

import { deleteUser } from '../../_api/delete-user-withdrawal'

export const useWithdraw = () => {
  const router = useRouter()
  const { logout } = useAuth()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      if (data.isSuccess) {
        logout()
        router.replace(PATH.HOME)
      }
    },
  })
}
