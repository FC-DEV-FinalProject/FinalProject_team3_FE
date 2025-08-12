import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import postReview from '../../_api/post-review'

export interface PostReviewErrModel {
  isSuccess: boolean
  message: string
  code: number
}

const usePostReview = (strategyId: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    boolean | undefined | PostReviewErrModel,
    PostReviewErrModel,
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.STRATEGY_REVIEWS, strategyId] })
    },
  })
}

export default usePostReview
