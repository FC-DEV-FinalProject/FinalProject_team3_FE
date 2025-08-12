import getMyDailyAnalysis from '@/app/(dashboard)/my/_api/get-my-daily-analysis'
import {
  deleteAllAnalysis,
  uploadDailyAnalysis,
} from '@/app/(dashboard)/my/_api/post-daily-analysis'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { AnalysisDataModel } from '@/shared/types/strategy-data'

interface UploadMutationParamsModel {
  data: AnalysisDataModel[]
}

export const useAnalysisUploadMutation = (
  strategyId: number,
  page: number = 1,
  size: number = 10
) => {
  const queryClient = useQueryClient()

  const uploadMutation = useMutation<void, Error, UploadMutationParamsModel>({
    mutationFn: ({ data }) => uploadDailyAnalysis(strategyId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_DAILY_ANALYSIS, strategyId],
      })

      try {
        const newData = await getMyDailyAnalysis(strategyId, page, size)
        queryClient.setQueryData([QUERY_KEY.MY_DAILY_ANALYSIS, strategyId], newData)
      } catch (err) {
        console.error('Failed to fetch updated my daily analysis data:', err)
      }
    },
  })

  const deleteMutation = useMutation<void, Error, void>({
    mutationFn: () => deleteAllAnalysis(strategyId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_DAILY_ANALYSIS, strategyId],
      })

      try {
        const newData = await getMyDailyAnalysis(strategyId, page, size)
        queryClient.setQueryData([QUERY_KEY.MY_DAILY_ANALYSIS, strategyId], newData)
      } catch (err) {
        console.error('Failed to fetch updated my daily analysis data:', err)
      }
    },
  })

  return {
    uploadAnalysis: uploadMutation.mutate,
    deleteAllAnalysis: deleteMutation.mutate,
    isLoading: uploadMutation.status === 'pending' || deleteMutation.status === 'pending',
    isError: uploadMutation.status === 'error' || deleteMutation.status === 'error',
    error: uploadMutation.error || deleteMutation.error,
  }
}
