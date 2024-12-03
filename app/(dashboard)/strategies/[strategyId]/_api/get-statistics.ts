import axiosInstance from '@/shared/api/axios'

const getStatistics = async (strategyId: number) => {
  try {
    const response = await axiosInstance.get(`/api/strategies/${strategyId}/statistics`)
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getStatistics
