import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { deleteMyStrategy } from '../../_api/delete-my-strategy'

export const useDeleteMyStrategy = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (strategyId: number) => deleteMyStrategy(strategyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_STRATEGIES],
      })
    },
  })

  return { mutate, isPending }
}
