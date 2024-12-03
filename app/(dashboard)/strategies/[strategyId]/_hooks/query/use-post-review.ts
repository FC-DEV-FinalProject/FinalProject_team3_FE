import { useMutation, useQueryClient } from '@tanstack/react-query'

import postReview from '../../_api/post-review'

const usePostReview = (strategyId: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    boolean | null,
    undefined,
    { strategyId: number; content: { content: string; starRating: number } }
  >({
    mutationFn: ({
      strategyId,
      content,
    }: {
      strategyId: number
      content: { content: string; starRating: number }
    }) => postReview(strategyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', strategyId] })
    },
  })
}

export default usePostReview
