'use client'

import ListHeader from '@/app/(dashboard)/_ui/list-header'
import StrategiesItem from '@/app/(dashboard)/_ui/strategies-item'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { useMSWStore } from '@/shared/stores/msw'
import Pagination from '@/shared/ui/pagination'

import useGetStrategiesData from '../../_hooks/query/use-get-strategies-data'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 8

const StrategyList = () => {
  const isReady = useMSWStore((state) => state.isReady)
  const { size, page, handlePageChange } = usePagination({
    basePath: PATH.STRATEGIES,
    pageSize: COUNT_PER_PAGE,
  })
  const { data } = useGetStrategiesData({ isReady, page, size })

  const strategiesData = data?.strategiesData || []
  const totalPages = data?.totalPages || null

  return (
    <>
      <ListHeader />
      {strategiesData?.map((strategy) => (
        <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
      ))}
      <div className={cx('pagination')}>
        {totalPages && (
          <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  )
}

export default StrategyList
