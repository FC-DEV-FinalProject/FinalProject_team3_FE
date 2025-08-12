'use client'

import TopStrategyCard from '.'
import { TopStrategyCardCommonProps } from './types'

export type CardSizeType = 'small' | 'large'

interface Props extends TopStrategyCardCommonProps {
  size?: CardSizeType
  score: number
}

const TopSmScoreCard = ({
  id,
  size = 'small',
  ranking,
  nickname,
  title,
  chartData,
  percentageChange,
  score,
}: Props) => {
  return (
    <TopStrategyCard size={size} id={id}>
      <TopStrategyCard.ContentsWrapper>
        <TopStrategyCard.Content ranking={ranking} nickname={nickname} title={title} />
        <TopStrategyCard.SmScore score={score} />
      </TopStrategyCard.ContentsWrapper>
      <TopStrategyCard.ProfitChart
        chartData={chartData}
        percentageChange={percentageChange}
        size={size}
      />
    </TopStrategyCard>
  )
}

export default TopSmScoreCard
