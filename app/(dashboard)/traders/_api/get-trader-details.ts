// // import axiosInstance from '@/shared/api/axios'
// // interface TraderReturnModel {
// //   // 수민님이 만들어두신 모델 찾아와서 넣으면될듯.. reuslt content에..
// // }
// // interface Props {
// //   traderId: number
// // }
// // const getTraderDetails = async ({ traderId }: Props) => {
// //   try {
// //     const response = await axiosInstance.get(`/api/strategies/search/trader/${traderId}`)
// //     return response.data.result
// //   } catch (err) {
// //     console.error(err)
// //     throw new Error('트레이더 상세 조회에 실패했습니다.')
// //   }
// // }
// // export default getTraderDetails
// import axiosInstance from '@/shared/api/axios'
// interface Props {
//   traderId: number
// }
// export interface StockTypeInfoModel {
//   stockTypeIconUrls: string[]
//   stockTypeNames: string[]
// }
// export interface ProfitRateChartDataModel {
//   dates: string[]
//   profitRates: number[]
// }
// export interface StrategyModel {
//   strategyId: number
//   strategyName: string
//   traderImgUrl: string
//   nickname: string
//   stockTypeInfo: StockTypeInfoModel
//   tradeTypeIconUrl: string
//   tradeTypeName: string
//   profitRateChartData: ProfitRateChartDataModel
//   mdd: number
//   smScore: number
//   cumulativeProfitRate: number
//   recentYearProfitLossRate: number
//   subscriptionCount: number
//   averageRating: number
//   totalReviews: number
//   isSubscribed: boolean
// }
// interface TraderStrategiesResponseModel {
//   isSuccess: boolean
//   message: string
//   result: {
//     content: StrategyModel[]
//     page: number
//     size: number
//     totalElements: number
//     totalPages: number
//     first: boolean
//     last: boolean
//   }
// }
// const getTraderStrategies = async ({
//   traderId,
// }: Props): Promise<TraderStrategiesResponseModel['result']> => {
//   try {
//     const response = await axiosInstance.get<TraderStrategiesResponseModel>(
//       `/api/strategies/search/trader/${traderId}`
//     )
//     return response.data.result
//   } catch (err) {
//     console.error(err)
//     throw new Error('트레이더의 전략 목록 조회에 실패했습니다.')
//   }
// }
// export default getTraderStrategies
import axiosInstance from '@/shared/api/axios'

export interface StockTypeInfoModel {
  stockTypeIconUrls: string[]
  stockTypeNames: string[]
}

export interface ProfitRateChartDataModel {
  dates: string[]
  profitRates: number[]
}

export interface StrategyModel {
  strategyId: number
  strategyName: string
  traderImgUrl: string
  nickname: string
  stockTypeInfo: StockTypeInfoModel
  tradeTypeIconUrl: string
  tradeTypeName: string
  profitRateChartData: ProfitRateChartDataModel
  mdd: number
  smScore: number
  cumulativeProfitRate: number
  recentYearProfitLossRate: number
  subscriptionCount: number
  averageRating: number
  totalReviews: number
  isSubscribed: boolean
}

interface TraderStrategiesResponseModel {
  isSuccess: boolean
  message: string
  result: {
    content: StrategyModel[]
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
