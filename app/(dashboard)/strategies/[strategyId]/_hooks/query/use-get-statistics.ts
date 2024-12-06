import { useQuery } from '@tanstack/react-query'

import getStatistics from '../../_api/get-statistics'

const useGetStatistics = (strategyId: number) => {
  return useQuery({
    queryKey: ['statistics', strategyId],
    queryFn: () => getStatistics(strategyId),
  })
}

export default useGetStatistics
