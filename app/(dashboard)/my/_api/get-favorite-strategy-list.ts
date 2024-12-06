import axiosInstance from '@/shared/api/axios'
import { StrategiesModel } from '@/shared/types/strategy-data'

interface Props {
  page: number
  size: number
}

const getFavoriteStrategyList = async ({
  page = 1,
  size = 6,
}: Props): Promise<{ strategiesData: StrategiesModel[]; totalPages: number } | undefined> => {
  try {
    const response = await axiosInstance.get(
      `/api/my-strategies/subscribed?page=${page}&size=${size}`
    )

    const {
      content: strategiesData,
      totalPages,
    }: { content: StrategiesModel[]; totalPages: number } = await response.data.result

    return { strategiesData, totalPages }
  } catch (err) {
    console.error(err)
    throw new Error('구독한 전략 조회에 실패했습니다.')
  }
}

export default getFavoriteStrategyList
