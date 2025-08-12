import axiosInstance from '@/shared/api/axios'
import { AccountImageDataModel } from '@/shared/types/strategy-data'

const getMyAccountImages = async (
  strategyId: number
): Promise<AccountImageDataModel | null | undefined> => {
  try {
    const response = await axiosInstance.get(`/api/my-strategies/${strategyId}/account-images`)
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getMyAccountImages
