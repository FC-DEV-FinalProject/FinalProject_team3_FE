import axiosInstance from '@/shared/api/axios'
import { AccountImageDataModel } from '@/shared/types/strategy-data'

const getAccountImages = async (
  strategyId: number
): Promise<AccountImageDataModel | null | undefined> => {
  try {
    const response = await axiosInstance.get(`/api/strategies/${strategyId}/account-images`)
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getAccountImages
