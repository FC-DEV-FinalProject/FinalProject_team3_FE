import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import patchReview from '../../_api/patch-review'

const usePatchReview = (strategyId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      strategyId,
      reviewId,
      content,
    }: {
      strategyId: number
      reviewId: number
      content: { content: string; starRating: number }
    }) => patchReview(strategyId, reviewId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.STRATEGY_REVIEWS, strategyId] })
    },
  })
}

export default usePatchReview
