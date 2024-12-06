import axiosInstance from '@/shared/api/axios'
import { StrategiesModel } from '@/shared/types/strategy-data'

interface StrategiesResponseModel {
  isSuccess: boolean
  message: string
  result: {
    content: StrategiesModel[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}

export const getMyStrategyList = async ({ page = 1, size }: { page: number; size: number }) => {
  const response = await axiosInstance.get<StrategiesResponseModel>(
    `/api/my-strategies?userId=1&page=${page}&size=${size}`
  )
  const { content, totalElements, page: page_, size: size_ } = response.data.result
  return {
    strategies: content,
    hasMore: totalElements > page_ * size_,
  }
}
