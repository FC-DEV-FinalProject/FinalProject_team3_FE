import axiosInstance from '@/shared/api/axios'

interface WithDrawUserResponseModel<T> {
  isSuccess: boolean
  message: string
  result: T
  code: number
}

export const deleteUser = async () => {
  const response = await axiosInstance.delete<WithDrawUserResponseModel<void>>('/api/users')
  return response.data
}
