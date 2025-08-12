import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getMyDailyAnalysis from '../../_api/get-my-daily-analysis'

const useGetMyDailyAnalysis = (strategyId: number, page: number, size: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_DAILY_ANALYSIS, strategyId, page, size],
    queryFn: () => getMyDailyAnalysis(strategyId, page, size),
  })
}

export default useGetMyDailyAnalysis
