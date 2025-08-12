'use client'

import { useParams } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import BackHeader from '@/shared/ui/header/back-header'
import Pagination from '@/shared/ui/pagination'
import Spinner from '@/shared/ui/spinner'
import Title from '@/shared/ui/title'
import TradersListCard from '@/shared/ui/traders-list-card'

import ListHeader from '../../_ui/list-header'
import StrategiesItem from '../../_ui/strategies-item'
import useGetTraderStrategies from '../_hooks/use-get-trader-details'
import useGetTraderProfile from '../_hooks/use-get-trader-profile'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const TraderDetailPage = () => {
  const { traderId } = useParams()
  const traderIdToNumber = parseInt(traderId as string)
  const { data: strategiesData, isLoading } = useGetTraderStrategies({
    traderId: traderIdToNumber,
  })
  const { data: traderProfile } = useGetTraderProfile(traderIdToNumber)
  const { page, handlePageChange } = usePagination({
    basePath: `${PATH.TRADERS}/${traderId}`,
    pageSize: 5,
  })

  const strategies = strategiesData?.content
  const totalPages = strategiesData?.totalPages

  if (isLoading) {
    return <Spinner className={cx('spinner')} />
  }

  if (!traderProfile) {
    return <p className={cx('empty-message')}>트레이더 정보를 불러오지 못했습니다.</p>
  }

  return (
    <>
      <div className={cx('page-container')}>
        <BackHeader label={'목록으로 돌아가기'} href={PATH.TRADERS} />
        <div className={cx('title')}>
          <Title label={'트레이더 상세보기'} />
        </div>
        <div className={cx('card-wrapper')}>
          <TradersListCard
            imageUrl={traderProfile.imageUrl}
            nickname={traderProfile.nickname}
            strategyCount={traderProfile.strategyCount}
            subscriberCount={traderProfile.totalSubCount}
            userId={traderIdToNumber}
            hasButton={false}
          />
        </div>
        <ListHeader />
        {strategies?.map((strategy) => (
          <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
        ))}
        {!strategies?.length && <p className={cx('empty-message')}>등록한 전략이 없습니다.</p>}
        {!!totalPages && (
          <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  )
}

export default TraderDetailPage
