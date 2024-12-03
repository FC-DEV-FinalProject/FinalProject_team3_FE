import dynamic from 'next/dynamic'

import classNames from 'classnames/bind'

import HomeSubtitle from '../home-subtitle'
import { AverageMetricsChartDataModel } from './average-metrics-chart'
import styles from './styles.module.scss'

const AverageMetricsChart = dynamic(() => import('./average-metrics-chart'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const cx = classNames.bind(styles)

const AverageMetricsSection = () => {
  const chartData: AverageMetricsChartDataModel = {
    dates: [
      'Jan 1, 2023',
      'Feb 1, 2023',
      'Mar 1, 2023',
      'Apr 1, 2023',
      'May 1, 2023',
      'Jun 1, 2023',
      'Jul 1, 2023',
      'Aug 1, 2023',
      'Sep 1, 2023',
      'Oct 1, 2023',
      'Nov 1, 2023',
      'Dec 1, 2023',
    ],
    averagePrice: [200, 220, 260, 310, 290, 340, 400, 380, 450, 530, 510, 580],
    topSmScore: [240, 270, 320, 330, 350, 420, 450, 470, 550, 530, 600, 680],
    topStrategyPrice: [350, 330, 380, 450, 430, 500, 580, 560, 630, 710, 690, 760],
  }

  const startDate = chartData.dates[0]
  const endDate = chartData.dates.at(-1)

  return (
    <section>
      <HomeSubtitle>대표 전략 통합 평균 지표</HomeSubtitle>

      <div className={cx('container')}>
        <div className={cx('contents-wrapper')}>
          <div className={cx('date-wrapper')}>
            FROM <span className={cx('date')}>{startDate}</span>TO
            <span className={cx('date')}>{endDate}</span>
          </div>
          <div className={cx('chart-wrapper')}>
            <AverageMetricsChart data={chartData} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AverageMetricsSection
