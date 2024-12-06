'use client'

import classNames from 'classnames/bind'

import BackHeader from '@/shared/ui/header/back-header'
import Title from '@/shared/ui/title'
import TradersListCard from '@/shared/ui/traders-list-card'

import ListHeader from '../../_ui/list-header'
import StrategiesItem from '../../_ui/strategies-item'
import useGetTraderStrategies from '../_hooks/use-get-trader-details'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const TraderDetailPage = () => {
  const traderId = 1
  const { data: strategiesData, isLoading } = useGetTraderStrategies({
    traderId,
  })

  const strategies = strategiesData?.content
  const firstStrategy = strategies?.[0]

  if (!firstStrategy || isLoading) {
    return null
  }

  return (
    <>
      <div className={cx('page-container')}>
        <BackHeader label={'목록으로 돌아가기'} />
        <div className={cx('title')}>
          <Title label={'트레이더 상세보기'} />
        </div>
        <div className={cx('card-wrapper')}>
          <TradersListCard
            imageUrl={firstStrategy.traderImgUrl}
            nickname={firstStrategy.nickname}
            strategyCount={strategies.length}
            subscriberCount={firstStrategy.subscriptionCount}
            userId={traderId}
          />
        </div>
        <ListHeader />
        {strategies?.map((strategy) => (
          <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
        ))}
      </div>
    </>
  )
}

export default TraderDetailPage
