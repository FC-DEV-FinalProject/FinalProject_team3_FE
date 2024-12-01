'use client'

import ListHeader from '@/app/(dashboard)/_ui/list-header'
import StrategiesItem from '@/app/(dashboard)/_ui/strategies-item'
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
      <div className={cx('pagination')}>
        {strategiesData?.map((strategy) => (
          <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
        ))}
        {totalPages && (
          <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  )
}

export default FavoriteStrategyList
