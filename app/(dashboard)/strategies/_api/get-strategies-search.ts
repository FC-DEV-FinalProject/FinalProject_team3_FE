import axios from 'axios'

const getStrategiesSearch = async () => {
  try {
    const response = await axios.get('api/strategies/search')
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default getStrategiesSearch
