'use client'

import classNames from 'classnames/bind'

import Spinner from '@/shared/ui/spinner'

import useGetTopRankingSmScore from '../../_hooks/query/use-get-top-ranking-smscore'
import HomeSubtitle from '../home-subtitle'
import TopSmScoreCard from '../top-strategy-card/top-sm-score-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TopSmScoreSection = () => {
  const { data: topSmScoreStrategies, isLoading } = useGetTopRankingSmScore()

  return (
    <section className={cx('section-container')}>
      <HomeSubtitle>높은 SM 스코어별로 전략을 확인해보세요!</HomeSubtitle>

      {isLoading && !topSmScoreStrategies ? (
        <Spinner className={cx('spinner')} />
      ) : (
        topSmScoreStrategies && (
          <ul className={cx('strategy-wrapper')}>
            {topSmScoreStrategies.map((strategy, idx) => (
              <li key={strategy.strategyId}>
                <TopSmScoreCard
                  id={strategy.strategyId}
                  size={idx > 0 ? 'small' : 'large'}
                  ranking={idx + 1}
                  nickname={strategy.nickname}
                  title={strategy.strategyName}
                  chartData={strategy.profitRateChartData}
                  percentageChange={strategy.cumulativeProfitRate}
                  score={strategy.smScore}
                />
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  )
}

export default TopSmScoreSection
