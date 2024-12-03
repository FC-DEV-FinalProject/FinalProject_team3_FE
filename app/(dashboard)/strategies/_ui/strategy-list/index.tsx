'use client'

import ListHeader from '@/app/(dashboard)/_ui/list-header'
import StrategiesItem from '@/app/(dashboard)/_ui/strategies-item'
import classNames from 'classnames/bind'

import { STRATEGIES_PAGE_COUNT } from '@/shared/constants/count-per-page'
import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { StrategiesModel } from '@/shared/types/strategy-data'
import Pagination from '@/shared/ui/pagination'

import usePostStrategies from '../../_hooks/query/use-post-strategies'
import useSearchingItemStore from '../search-bar/_store/use-searching-item-store'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const StrategyList = () => {
  const { size, page, handlePageChange } = usePagination({
    basePath: PATH.STRATEGIES,
    pageSize: STRATEGIES_PAGE_COUNT,
  })
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const { data } = usePostStrategies({ page, size, searchTerms })
  const strategiesData = data?.content as StrategiesModel[]
  const totalPages = (data?.totalPages as number) || null

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
