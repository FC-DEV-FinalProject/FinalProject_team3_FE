// API Request Data
export interface DailyAnalysisModel {
  date: string
  principal: number
  transaction: number
  dailyProfitLoss: number
  dailyProfitLossRate: number
  cumulativeProfitLoss: number
  cumulativeProfitLossRate: number
}

export interface MonthlyAnalysisModel {
  month: string
  monthlyAveragePrincipal: number
  depositsWithdrawals: number
  monthlyProfitLoss: number
  monthlyProfitLossRate: number
  cumulativeProfitLoss: number
  cumulativeProfitLossRate: number
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
