import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteUser from '../../_api/delete-user'

const useDeleteUser = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] })
    },
  })
}

export default useDeleteUser
