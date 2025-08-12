import Link from 'next/link'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import TotalStar from '@/shared/ui/total-star'

import LineChart from '../line-chart'
import styles from './styles.module.scss'
import {
  CardSizeType,
  TopCardContentDetailsProps,
  TopCardContentProps,
  TopCardProfitChartProps,
} from './types'

const cx = classNames.bind(styles)

interface Props {
  id: number
  size?: CardSizeType
  children: React.ReactNode
}

const TopStrategyCard = ({ id, size, children }: Props) => {
  return (
    <Link className={cx('card-container', size)} href={`${PATH.STRATEGIES}/${id}`}>
      {children}
    </Link>
  )
}

const ContentsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('contents-wrapper')}>{children}</div>
}

const Content = ({ ranking, profileImage, nickname, title }: TopCardContentProps) => {
  return (
    <div className={cx('content-wrapper')}>
      <strong className={cx('ranking')}>Top {ranking}</strong>
      <div className={cx('profile')}>
        <Avatar src={profileImage} size="small" />
        <span className={cx('nickname')}>{nickname}</span>
      </div>
      <h3 className={cx('title')}>{title}</h3>
    </div>
  )
}

const ContentDetails = ({
  subscriptionCount,
  averageRating,
  reviewCount,
}: TopCardContentDetailsProps) => {
  return (
    <div className={cx('content-details-wrapper')}>
      <span className={cx('subscription')}>{subscriptionCount.toLocaleString()}명 구독</span>
      <TotalStar averageRating={averageRating} totalElements={reviewCount} />
    </div>
  )
}

const SmScore = ({ score }: { score: number }) => {
  return (
    <div className={cx('score-wrapper')}>
      <span className={cx('label')}>SM SCORE</span>
      <span className={cx('score')}>{score.toFixed(1)}</span>
    </div>
  )
}

const ProfitChart = ({
  chartData,
  profitAlign = 'horizontal',
  percentageChange,
  size,
}: TopCardProfitChartProps) => {
  const isNegative = percentageChange < 0

  return (
    <div className={cx('profit-wrapper')}>
      <div className={cx('chart')}>
        <LineChart data={chartData} isNegative={isNegative} size={size} />
      </div>
      <div className={cx('profit', profitAlign)}>
        <span className={cx('label')}>누적수익률</span>
        <span className={cx('value', { negative: isNegative })}>
          {isNegative ? '' : '+'}
          {percentageChange.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

export default Object.assign(TopStrategyCard, {
  ContentsWrapper,
  Content,
  ContentDetails,
  SmScore,
  ProfitChart,
})
