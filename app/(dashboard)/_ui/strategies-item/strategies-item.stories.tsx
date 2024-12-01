import type { Meta, StoryFn } from '@storybook/react'

import { StrategiesModel } from '@/shared/types/strategy-data'

import StrategiesItem from './index'

const meta: Meta<typeof StrategiesItem> = {
  title: 'components/StrategiesItem',
  component: StrategiesItem,
  tags: ['autodocs'],
}

const strategy: StoryFn<{ strategiesData: StrategiesModel[] }> = ({ strategiesData }) => (
  <>
    {strategiesData.map((strategy) => (
      <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
    ))}
  </>
)

export const Primary = strategy.bind({})
Primary.args = {
  strategiesData: [
    {
      strategyId: 1,
      strategyName: 'Dynamic ETF 전략',
      traderImgUrl: '/images/trader1.png',
      nickname: 'AlphaTrader',
      stockTypeInfo: {
        stockTypeIconUrls: ['/images/stock.png'],
        stockTypeNames: ['해외지수선물'],
      },
      profitRateChartData: {
        dates: [
          '2023-01-01',
          '2023-01-02',
          '2023-01-03',
          '2023-01-04',
          '2023-01-05',
          '2023-01-06',
          '2023-01-07',
          '2023-01-08',
          '2023-01-09',
        ],
        profitRates: [7.2, 5.2, 25, 12.8, 17.2, 11.4, 20, 16, 18],
      },
      tradeTypeIconUrl: '/images/trade.png',
      tradeTypeName: '자동',
      mdd: -15432567,
      smScore: 72.1,
      cumulativeProfitRate: 140.5,
      recentYearProfitLossRate: 35.2,
      subscriptionCount: 45,
      averageRating: 4.9,
      totalReviews: 34,
      isSubscribed: true,
    },
    {
      strategyId: 2,
      strategyName: '고수익 ETF',
      traderImgUrl: '/images/trader2.png',
      nickname: 'BetaTrader',
      stockTypeInfo: {
        stockTypeIconUrls: ['/images/stock.png'],
        stockTypeNames: ['해외지수선물'],
      },
      profitRateChartData: {
        dates: [
          '2023-01-01',
          '2023-01-02',
          '2023-01-03',
          '2023-01-04',
          '2023-01-05',
          '2023-01-06',
          '2023-01-07',
          '2023-01-08',
          '2023-01-09',
        ],
        profitRates: [7.2, 5.2, 25, 12.8, 17.2, 11.4, 20, 16, 18],
      },
      tradeTypeIconUrl: '/images/trade.png',
      tradeTypeName: '자동',
      mdd: -12786543,
      smScore: 65.4,
      cumulativeProfitRate: 125.3,
      recentYearProfitLossRate: 28.4,
      subscriptionCount: 67,
      averageRating: 4.6,
      totalReviews: 19,
      isSubscribed: false,
    },
  ],
}

export default meta
