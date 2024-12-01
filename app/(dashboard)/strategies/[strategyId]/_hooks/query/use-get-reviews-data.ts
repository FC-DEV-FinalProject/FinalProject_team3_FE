import { useQuery } from '@tanstack/react-query'

import getReviews from '../../_api/get-reviews'

interface Props {
  isReady: boolean
  strategyId: number
  page: number | undefined
}

const useGetReviewsData = ({ isReady, strategyId, page }: Props) => {
  return useQuery({
    queryKey: ['reviews', strategyId, page],
    queryFn: () => getReviews(strategyId, page),
    enabled: isReady,
  })
}

export default useGetReviewsData
