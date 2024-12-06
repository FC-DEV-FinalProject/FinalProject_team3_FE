import { useMutation, useQueryClient } from '@tanstack/react-query'

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
      queryClient.invalidateQueries({ queryKey: ['reviews', strategyId] })
    },
  })
}

export default usePatchReview
