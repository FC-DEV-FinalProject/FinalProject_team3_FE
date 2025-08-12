import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getReviews from '../../_api/get-reviews'

interface Props {
  strategyId: number
  page: number | undefined
}

const useGetReviewsData = ({ strategyId, page }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGY_REVIEWS, strategyId],
    queryFn: () => getReviews(strategyId, page),
  })
}

export default useGetReviewsData
