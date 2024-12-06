import { useQuery } from '@tanstack/react-query'

import { StrategyCardModel } from '@/shared/types/strategy-data'

import { getTopRanking } from '../../_api/top-strategies'

const useGetTopRanking = () => {
  return useQuery<StrategyCardModel[]>({
    queryKey: ['topRanking'],
    queryFn: getTopRanking,
  })
}

export default useGetTopRanking
