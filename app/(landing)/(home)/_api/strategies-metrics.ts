import axios from 'axios'

export const getStrategiesMetrics = async () => {
  try {
    const response = await axios.get('/api/main/total-strategies-metrics')
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('대표 전략 통합 지표 조회에 실패했습니다.')
  }
}
