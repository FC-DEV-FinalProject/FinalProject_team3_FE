import { StarIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Avatar from '@/shared/ui/avatar'

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
  size?: CardSizeType
  children: React.ReactNode
}

const TopStrategyCard = ({ size, children }: Props) => {
  return <div className={cx('card-container', size)}>{children}</div>
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
      <div className={cx('rating-wrapper')}>
        <StarIcon width="24px" height="24px" />
        <span>
          {averageRating} ({reviewCount})
        </span>
      </div>
    </div>
  )
}

const SmScore = ({ score }: { score: number }) => {
  return (
    <div className={cx('score-wrapper')}>
      <span className={cx('label')}>SM SCORE</span>
      <span className={cx('score')}>{score}</span>
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
