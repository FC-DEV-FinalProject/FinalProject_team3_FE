import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { StrategyCardModel } from '@/shared/types/strategy-data'

import { getTopRanking } from '../../_api/top-strategies'

const useGetTopRanking = () => {
  return useQuery<StrategyCardModel[]>({
    queryKey: [QUERY_KEY.TOP_RANKING],
    queryFn: getTopRanking,
  })
}

export default useGetTopRanking
