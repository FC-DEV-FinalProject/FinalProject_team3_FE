import Link from 'next/link'

import classNames from 'classnames/bind'

import { StrategiesModel } from '@/shared/types/strategy-data'
import { Button } from '@/shared/ui/button'

import AreaChart from './area-chart'
import StrategiesSummary from './strategies-summary'
import styles from './styles.module.scss'
import Subscribe from './subscribe'

const cx = classNames.bind(styles)

interface Props {
  strategiesData: StrategiesModel
  type?: 'default' | 'my'
}

const StrategiesItem = ({ strategiesData: data, type = 'default' }: Props) => {
  return (
    <Link className={cx('container', type)} href={`/strategies/${data.strategyId}`}>
      <StrategiesSummary
        // iconUrls={[data.tradeTypeIconUrl, ...data.stockTypeInfo.stockTypeIconUrls]}
        // iconNames={[data.tradeTypeName, ...data.stockTypeInfo.stockTypeNames]}
        title={data.strategyName}
        profile={{
          traderImage: data.traderImgUrl,
          nickname: data.nickname,
        }}
        subscriptionCount={data.subscriptionCount}
        averageRating={data.averageRating}
        totalReview={data.totalReviews}
      />
      <AreaChart profitRateChartData={data.profitRateChartData} />
      <div className={cx('mdd')}>
        <p>{data.mdd}</p>
      </div>
      <div className={cx('sm-score')}>
        <p>{data.smScore}</p>
      </div>
      <div className={cx('profit')}>
        <span>누적 수익률</span>
        <p>{data.cumulativeProfitRate}%</p>
        <span>최근 1년 수익률</span>
        <p>{data.recentYearProfitLossRate ? data.recentYearProfitLossRate + '%' : '-'}</p>
      </div>
      {type === 'default' && (
        <div className={cx('subscribe')}>
          <Subscribe subscriptionStatus={data.isSubscribed} />
        </div>
      )}
      {type === 'my' && (
        <>
          <div className={cx('public')}>
            <p>{data.isPublic === 'PUBLIC' ? '공개' : '비공개'}</p>
          </div>
          <div className={cx('manage-buttons')}>
            <Button size="small" variant="filled">
              관리
            </Button>
            <Button size="small" variant="outline">
              삭제
            </Button>
          </div>
        </>
      )}
    </Link>
  )
}

export default StrategiesItem
