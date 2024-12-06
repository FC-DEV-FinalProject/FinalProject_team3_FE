import axiosInstance from '@/shared/api/axios'

const getStrategiesSearch = async () => {
  try {
    const response = await axiosInstance.get('api/strategies/search')
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getStrategiesSearch
