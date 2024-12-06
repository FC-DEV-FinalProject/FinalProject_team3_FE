'use client'

import classNames from 'classnames/bind'

import Spinner from '@/shared/ui/spinner'

import useGetUserMetrics from '../../_hooks/query/use-get-user-metrics'
import HomeSubtitle from '../home-subtitle'
import MetricCard from '../metric-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const UserMetricsSection = () => {
  const { data: metrics, isLoading } = useGetUserMetrics()

  if (isLoading) {
    return <Spinner className={cx('spinner')} />
  }

  if (!metrics) {
    return null
  }

  return (
    <section>
      <HomeSubtitle>이미 이렇게 많은 사람들이 주식 전략을 공유하고, 구독하고 있어요!</HomeSubtitle>

      <div className={cx('card-wrapper')}>
        <MetricCard count={metrics.totalTrader} label="명의 트레이더가" />
        <MetricCard count={metrics.totalStrategies} label="개의 투자 전략을 올렸어요!" />
        <MetricCard count={metrics.totalInvestor} label="명의 투자자가" />
        <MetricCard count={metrics.totalSubscribe} label="개의 전략을 구독 중이에요!" />
      </div>
    </section>
  )
}

export default UserMetricsSection
