import axiosInstance from '@/shared/api/axios'
import { AnalysisDataModel } from '@/shared/types/strategy-data'

export const uploadDailyAnalysis = async (
  strategyId: number,
  data: AnalysisDataModel[]
): Promise<void> => {
  const response = await axiosInstance.post(`/api/my-strategies/${strategyId}/daily-analysis`, data)
  return response.data
}

export const deleteAllAnalysis = async (strategyId: number): Promise<void> => {
  const response = await axiosInstance.delete(`/api/my-strategies/${strategyId}/daily-analysis`)
  return response.data
}
