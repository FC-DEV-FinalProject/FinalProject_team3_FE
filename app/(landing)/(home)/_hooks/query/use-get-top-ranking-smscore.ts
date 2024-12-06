import { useQuery } from '@tanstack/react-query'

import { StrategyCardModel } from '@/shared/types/strategy-data'

import { getTopRankingSmScore } from '../../_api/top-strategies'

const useGetTopRankingSmScore = () => {
  return useQuery<StrategyCardModel[]>({
    queryKey: ['topRankingSmScore'],
    queryFn: getTopRankingSmScore,
  })
}

export default useGetTopRankingSmScore
