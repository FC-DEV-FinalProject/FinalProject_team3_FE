import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getStatistics from '../../_api/get-statistics'

const useGetStatistics = (strategyId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGY_STATISTICS, strategyId],
    queryFn: () => getStatistics(strategyId),
  })
}

export default useGetStatistics
