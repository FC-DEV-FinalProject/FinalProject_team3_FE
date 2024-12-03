import axios from 'axios'

const getSubscribe = async (strategyId: number) => {
  try {
    const response = await axios.get(`/api/strategies/${strategyId}/subscribe?userId=3`)
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default getSubscribe
