import { useMutation } from '@tanstack/react-query'

import getAnalysisDownload from '../../_api/get-analysis-download'

const useGetAnalysisDownload = () => {
  return useMutation({
    mutationFn: ({ strategyId, type }: { strategyId: number; type: 'daily' | 'monthly' }) =>
      getAnalysisDownload(strategyId, type),
  })
}

export default useGetAnalysisDownload
