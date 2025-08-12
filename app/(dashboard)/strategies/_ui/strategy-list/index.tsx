'use client'

import { useEffect } from 'react'

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

/* eslint-disable react-hooks/exhaustive-deps */

const cx = classNames.bind(styles)

const StrategyList = () => {
  const { size, page, handlePageChange } = usePagination({
    basePath: PATH.STRATEGIES,
    pageSize: STRATEGIES_PAGE_COUNT,
  })
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const { resetState } = useSearchingItemStore((state) => state.actions)
  const { data, isLoading, refetch } = usePostStrategies({ page, size, searchTerms })

  useEffect(() => {
    handleInitialize()
  }, [])

  const handleInitialize = async () => {
    await resetState()
    await refetch()
  }

  const strategiesData = data?.content as StrategiesModel[]
  const totalPages = (data?.totalPages as number) || null

  return (
    <>
      {strategiesData?.length > 0 ? (
        <>
          {strategiesData.map((strategy) => (
            <StrategiesItem key={strategy.strategyId} strategiesData={strategy} />
          ))}
          <div className={cx('pagination')}>
            {totalPages && (
              <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </>
      ) : (
        !isLoading && <div className={cx('no-data')}>검색된 전략이 없습니다.</div>
      )}
    </>
  )
}

export default StrategyList
