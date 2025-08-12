import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import {
  EditAnalysisPayloadModel,
  deleteAllAnalysis,
  deleteAnalysis,
  editAnalysis,
} from '../../_api/manage-daily-analysis'

export const useMyAnalysisMutation = (strategyId: number, page: number, size: number) => {
  const queryClient = useQueryClient()
  const queryKey = [QUERY_KEY.MY_DAILY_ANALYSIS, strategyId, page, size]

  const { mutate: editAnalysisData } = useMutation({
    mutationFn: ({ payload }: { payload: EditAnalysisPayloadModel }) => {
      if (!strategyId) {
        throw new Error('Strategy ID is required')
      }
      return editAnalysis(strategyId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (err: Error) => {
      console.error('Edit error:', err)
      throw err
    },
  })

  const { mutate: deleteAnalysisData } = useMutation({
    mutationFn: (analysisId: number) => {
      if (!strategyId) {
        throw new Error('Strategy ID is required')
      }
      return deleteAnalysis(strategyId, analysisId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (err: Error) => {
      console.error('Delete error:', err)
      throw err
    },
  })

  const { mutate: deleteAllAnalysisData } = useMutation({
    mutationFn: () => {
      if (!strategyId) {
        throw new Error('Strategy ID is required')
      }
      return deleteAllAnalysis(strategyId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (err: Error) => {
      console.error('Delete all error:', err)
      throw err
    },
  })

  return {
    editAnalysisData,
    deleteAnalysisData,
    deleteAllAnalysisData,
  }
}
