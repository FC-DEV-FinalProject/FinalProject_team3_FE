'use client'

import TopStrategyCard from '.'
import { TopStrategyCardCommonProps } from './types'

interface Props extends TopStrategyCardCommonProps {
  subscriptionCount: number
  averageRating: number
  reviewCount: number
}

const TopFavoriteCard = ({
  ranking,
  nickname,
  title,
  chartData,
  percentageChange,
  subscriptionCount,
  averageRating,
  reviewCount,
}: Props) => {
  return (
    <TopStrategyCard>
      <TopStrategyCard.ContentsWrapper>
        <TopStrategyCard.Content ranking={ranking} nickname={nickname} title={title} />
        <TopStrategyCard.ContentDetails
          subscriptionCount={subscriptionCount}
          averageRating={averageRating}
          reviewCount={reviewCount}
        />
      </TopStrategyCard.ContentsWrapper>
      <TopStrategyCard.ProfitChart
        chartData={chartData}
        percentageChange={percentageChange}
        size="small"
        profitAlign="vertical"
      />
    </TopStrategyCard>
  )
}

export default TopFavoriteCard
