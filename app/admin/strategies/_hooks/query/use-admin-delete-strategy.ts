import { deleteMyStrategy } from '@/app/(dashboard)/my/_api/delete-my-strategy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

const useDeleteAdminStrategy = (strategyId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteMyStrategy(strategyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_STRATEGIES],
      })
    },
  })
}

export default useDeleteAdminStrategy
