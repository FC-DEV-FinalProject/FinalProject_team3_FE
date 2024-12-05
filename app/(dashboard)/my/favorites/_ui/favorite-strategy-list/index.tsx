'use client'

import { Suspense } from 'react'

import ListHeader from '@/app/(dashboard)/_ui/list-header'
import StrategiesItem from '@/app/(dashboard)/_ui/strategies-item'
import StrategiesItemSkeleton from '@/app/(dashboard)/_ui/strategies-item/skeleton'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import Pagination from '@/shared/ui/pagination'

import useGetFavoriteStrategyList from '../../../_hooks/query/use-get-favorite-strategy-list'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 6

const FavoriteStrategyList = () => {
  const { page, handlePageChange } = usePagination({
    basePath: PATH.FAVORITES,
    pageSize: COUNT_PER_PAGE,
  })

  const { data } = useGetFavoriteStrategyList({ page, size: COUNT_PER_PAGE })

  const strategiesData = data?.strategiesData || []
  const totalPages = data?.totalPages || null

  return (
    <>
      <ListHeader />
      <Suspense fallback={<Skeleton />}>
        <div className={cx('pagination')}>
          {!strategiesData.length && (
            <p className={cx('no-strategy')}>구독한 관심 전략이 없습니다.</p>
          )}
          {strategiesData?.map((strategy) => (
            <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
          ))}
          {totalPages && (
            <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </Suspense>
    </>
  )
}

const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, idx) => (
        <StrategiesItemSkeleton key={idx} />
      ))}
    </>
  )
}

export default FavoriteStrategyList
