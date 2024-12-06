import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteReview from '../../_api/delete-review'

const useDeleteReview = (strategyId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ strategyId, reviewId }: { strategyId: number; reviewId: number }) =>
      deleteReview(strategyId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', strategyId] })
    },
  })
}

export default useDeleteReview
