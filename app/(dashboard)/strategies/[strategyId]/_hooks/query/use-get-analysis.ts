import { AnalysisTabType } from '@/app/(dashboard)/_ui/analysis-container/tabs-width-table'
import { useQuery } from '@tanstack/react-query'

import getAnalysis from '../../_api/get-analysis'

const useGetAnalysis = (strategyId: number, type: AnalysisTabType, page: number, size: number) => {
  return useQuery({
    queryKey: ['analysis', strategyId, type, page],
    queryFn: () => getAnalysis(strategyId, type, page, size),
  })
}

export default useGetAnalysis
