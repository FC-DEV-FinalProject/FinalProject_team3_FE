import axiosInstance from '@/shared/api/axios'
import { StrategiesModel } from '@/shared/types/strategy-data'

export interface StockTypeInfoModel {
  stockTypeIconUrls: string[]
  stockTypeNames: string[]
}

export interface ProfitRateChartDataModel {
  dates: string[]
  profitRates: number[]
}

export interface TraderStrategiesResponseModel {
  isSuccess: boolean
  message: string
  result: {
    content: StrategiesModel[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}

interface Props {
  traderId: number
}

const getTraderStrategies = async ({
  traderId,
}: Props): Promise<TraderStrategiesResponseModel['result']> => {
  try {
    const response = await axiosInstance.get<TraderStrategiesResponseModel>(
      `/api/strategies/search/trader/${traderId}`
    )
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('트레이더의 전략 목록 조회에 실패했습니다.')
  }
}

export default getTraderStrategies
