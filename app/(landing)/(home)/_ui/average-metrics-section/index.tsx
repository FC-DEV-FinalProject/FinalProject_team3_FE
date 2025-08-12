'use client'

import dynamic from 'next/dynamic'

import classNames from 'classnames/bind'

import Spinner from '@/shared/ui/spinner'

import useGetStrategiesMetrics from '../../_hooks/query/use-get-strategies-metrics'
import HomeSubtitle from '../home-subtitle'
import styles from './styles.module.scss'

const AverageMetricsChart = dynamic(() => import('./average-metrics-chart'), {
  ssr: false,
})

const cx = classNames.bind(styles)

const AverageMetricsSection = () => {
  const { data: chartData, isLoading } = useGetStrategiesMetrics()

  if (!chartData && !isLoading) {
    return <p>차트 조회에 실패했습니다.</p>
  }

  const startDate = chartData?.dates[0]
  const endDate = chartData?.dates.at(-1)

  return (
    <section>
      <HomeSubtitle>대표 전략 통합 평균 지표</HomeSubtitle>

      <div className={cx('container')}>
        {isLoading && !chartData ? (
          <Spinner />
        ) : (
          chartData && (
            <div className={cx('contents-wrapper')}>
              <div className={cx('date-wrapper')}>
                FROM <span className={cx('date')}>{startDate}</span>TO
                <span className={cx('date')}>{endDate}</span>
              </div>
              <div className={cx('chart-wrapper')}>
                <AverageMetricsChart data={chartData} />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default AverageMetricsSection
