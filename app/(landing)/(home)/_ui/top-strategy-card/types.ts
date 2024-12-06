export type ProfitAlignType = 'vertical' | 'horizontal'
export type CardSizeType = 'small' | 'large'

export interface TopCardContentProps {
  ranking: number
  nickname: string
  profileImage?: string
  title: string
}

export interface TopCardProfitChartProps {
  chartData: number[]
  profitAlign?: ProfitAlignType
  percentageChange: number
  size: CardSizeType
}

export interface TopCardContentDetailsProps {
  subscriptionCount: number
  averageRating: number
  reviewCount: number
}

export interface TopStrategyCardCommonProps {
  ranking: number
  nickname: string
  title: string
  chartData: number[]
  percentageChange: number
}
