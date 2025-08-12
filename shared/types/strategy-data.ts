export interface DailyAnalysisModel {
  date: string
  principal: number
  transaction: number
  dailyProfitLoss: number
  dailyProfitLossRate: number | string
  cumulativeProfitLoss: number
  cumulativeProfitLossRate: number | string
}

export interface MyDailyAnalysisModel {
  dailyAnalysisId: number
  dailyDate: string
  transaction: number
  dailyProfitLoss: number
  dailyProfitLossRate: number | string
  principal: number
  cumulativeProfitLoss: number
  cumulativeProfitLossRate: number | string
}

export interface MonthlyAnalysisModel {
  month: string
  monthlyAveragePrincipal: number
  depositsWithdrawals: number
  monthlyProfitLoss: number
  monthlyProfitLossRate: number | string
  cumulativeProfitLoss: number
  cumulativeProfitLossRate: number | string
}

export interface ProfitRateChartDataModel {
  dates: string[]
  profitRates: number[]
}

interface BaseStrategyModel {
  strategyId: number
  strategyName: string
  nickname: string
  stockTypeInfo: {
    stockTypeIconUrls: string[]
    stockTypeNames: string[]
  }
  tradeTypeIconUrl: string
  tradeTypeName: string
  cumulativeProfitRate: number
  smScore: number
  subscriptionCount: number
  isSubscribed: boolean
  traderImgUrl?: string
}

export interface StrategiesModel extends BaseStrategyModel {
  profitRateChartData: ProfitRateChartDataModel
  mdd: number
  recentYearProfitLossRate?: number
  averageRating: number
  totalReviews: number
  isPublic?: string
}

export interface StrategyDetailsInformationModel extends BaseStrategyModel {
  operationCycle: string
  strategyDescription: string
  maxDrawdownRate: number
  averageProfitLossRate: number
  profitFactor: number
  winRate: number
  minimumInvestmentAmount: string
  initialInvestment: number | string
  kpRatio: number
  finalProfitLossDate: string
  createdAt: string
  hasProposal: boolean
}

export interface StrategyCardModel {
  strategyId: number
  strategyName: string
  TraderImgUrl: string
  nickname: string
  profitRateChartData: number[]
  smScore: number
  cumulativeProfitRate: number
  subscriptionCount: number
  averageRating: number
  totalReviews: number
}

export interface AnalysisDataModel {
  date: string
  transaction: number
  dailyProfitLoss: number
}

export interface ImageDataModel {
  id: number
  imageUrl: string
  title: string
}

export interface AccountImageDataModel {
  content: ImageDataModel
  first: boolean
  last: boolean
  page: number
  size: number
  totalElements: number
  totalPages: number
}
