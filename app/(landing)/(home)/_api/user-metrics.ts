import axios from 'axios'

export const getUserMetrics = async () => {
  try {
    const response = await axios.get('/api/main/total-rate')
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('사용자 이용 지표 조회에 실패했습니다.')
  }
}
