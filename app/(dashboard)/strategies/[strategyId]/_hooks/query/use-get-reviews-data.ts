import { useQuery } from '@tanstack/react-query'

import getReviews from '../../_api/get-reviews'

interface Props {
  strategyId: number
  page: number | undefined
}

const useGetReviewsData = ({ strategyId, page }: Props) => {
  return useQuery({
    queryKey: ['reviews', strategyId],
    queryFn: () => getReviews(strategyId, page),
  })
}

export default useGetReviewsData
