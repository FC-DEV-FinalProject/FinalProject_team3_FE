import axios from 'axios'

export const getTopRanking = async () => {
  try {
    const response = await axios.get('/api/main/top-ranking')
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('구독수 상위 전략 조회에 실패했습니다.')
  }
}

export const getTopRankingSmScore = async () => {
  try {
    const response = await axios.get('/api/main/top-ranking-smscore')
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('SM Score 상위 전략 조회에 실패했습니다.')
  }
}
