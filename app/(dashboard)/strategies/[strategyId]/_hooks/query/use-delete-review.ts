import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import deleteReview from '../../_api/delete-review'

const useDeleteReview = (strategyId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ strategyId, reviewId }: { strategyId: number; reviewId: number }) =>
      deleteReview(strategyId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.STRATEGY_REVIEWS, strategyId] })
    },
  })
}

export default useDeleteReview
