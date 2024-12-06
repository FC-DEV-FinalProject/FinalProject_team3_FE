'use client'

import classNames from 'classnames/bind'

import useGetTopRankingSmScore from '../../_hooks/query/use-get-top-ranking-smscore'
import HomeSubtitle from '../home-subtitle'
import TopSmScoreCard from '../top-strategy-card/top-sm-score-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TopSmScoreSection = () => {
  const { data: topSmScoreStrategies } = useGetTopRankingSmScore()

  return (
    <section className={cx('section-container')}>
      <HomeSubtitle>높은 SM 스코어별로 전략을 확인해보세요!</HomeSubtitle>

      <ul className={cx('strategy-wrapper')}>
        {topSmScoreStrategies &&
          topSmScoreStrategies.map((strategy, idx) => (
            <li key={strategy.strategyId}>
              <TopSmScoreCard
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
    </section>
  )
}

export default TopSmScoreSection
