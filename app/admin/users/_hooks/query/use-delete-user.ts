import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteUser from '../../_api/delete-user'

const useDeleteUser = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_USERS] })
    },
  })
}

export default useDeleteUser
