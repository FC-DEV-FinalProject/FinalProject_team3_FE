import { useQuery } from '@tanstack/react-query'

import getMyDailyAnalysis from '../../_api/get-my-daily-analysis'

const useGetAnalysis = (strategyId: number, page: number, size: number) => {
  return useQuery({
    queryKey: ['myDailyAnalysis', strategyId, page],
    queryFn: () => getMyDailyAnalysis(strategyId, page, size),
  })
}

export default useGetAnalysis
