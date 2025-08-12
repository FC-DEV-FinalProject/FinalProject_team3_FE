import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { StrategyCardModel } from '@/shared/types/strategy-data'

import { getTopRankingSmScore } from '../../_api/top-strategies'

const useGetTopRankingSmScore = () => {
  return useQuery<StrategyCardModel[]>({
    queryKey: [QUERY_KEY.TOP_RANKING_SM_SCORE],
    queryFn: getTopRankingSmScore,
  })
}

export default useGetTopRankingSmScore
