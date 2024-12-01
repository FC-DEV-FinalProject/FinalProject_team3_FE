import { strategiesMockData } from '@/mocks/handlers/strategies'
import axios from 'axios'

import { StrategiesModel } from '@/shared/types/strategy-data'

const getStrategiesData = async (
  isReady: boolean,
  page: number,
  size: number
): Promise<{ strategiesData: StrategiesModel[]; totalPages: number } | undefined> => {
  if (!isReady) return { strategiesData: [], totalPages: 0 }

  try {
    const response = await axios.get(`/api/strategies?page=${page}&size=${size}`)
    if (!response.data) {
      console.error('전략 목록 데이터 가져오기 실패')
    }
    const {
      content: strategiesData,
      totalPages,
    }: { content: StrategiesModel[]; totalPages: number } = await response.data.result

    return { strategiesData, totalPages }
  } catch (err) {
    console.error(err)
    // 임시 목데이터
    return { strategiesData: strategiesMockData, totalPages: 2 }
  }
}

export default getStrategiesData
