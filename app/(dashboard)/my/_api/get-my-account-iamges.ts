import { ImageDataModel } from '@/app/(dashboard)/_ui/analysis-container/account-content'

import axiosInstance from '@/shared/api/axios'

interface ResponseModel {
  content: ImageDataModel
  first: boolean
  last: boolean
  page: number
  size: number
  totalElements: number
  totalPages: number
}

const getMyAccountImages = async (
  strategyId: number
): Promise<ResponseModel | null | undefined> => {
  try {
    const response = await axiosInstance.get(`/api/my-strategies/${strategyId}/account-images`)
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getMyAccountImages
