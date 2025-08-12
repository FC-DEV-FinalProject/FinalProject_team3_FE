import axiosInstance from '@/shared/api/axios'

export interface EditAnalysisPayloadModel {
  date: string
  transaction: number
  dailyProfitLoss: number
}

export const editAnalysis = async (strategyId: number, payload: EditAnalysisPayloadModel) => {
  const response = await axiosInstance.patch(
    `/api/my-strategies/${strategyId}/daily-analysis`,
    payload
  )
  return response.data
}

export const deleteAnalysis = async (strategyId: number, analysisId: number) => {
  const response = await axiosInstance.delete(
    `/api/my-strategies/${strategyId}/daily-analysis?analysisId=${analysisId}`
  )
  return response.data
}

export const deleteAllAnalysis = async (strategyId: number) => {
  const response = await axiosInstance.delete(`/api/my-strategies/${strategyId}/daily-analysis/all`)
  return response.data
}
