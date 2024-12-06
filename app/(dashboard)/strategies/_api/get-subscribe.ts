import axiosInstance from '@/shared/api/axios'

const getSubscribe = async (strategyId: number) => {
  try {
    const response = await axiosInstance.get(`/api/strategies/${strategyId}/subscribe`)
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default getSubscribe
