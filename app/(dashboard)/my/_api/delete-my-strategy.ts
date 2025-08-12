import axiosInstance from '@/shared/api/axios'
import { APIResponseBaseModel } from '@/shared/types/response'

export interface DeleteStrategyResponseModel extends APIResponseBaseModel<boolean> {
  result: Record<string, never>
}

export const deleteMyStrategy = async (
  strategyId: number
): Promise<DeleteStrategyResponseModel> => {
  const { data } = await axiosInstance.delete<DeleteStrategyResponseModel>(
    `/api/my-strategies/${strategyId}`
  )
  return data
}
