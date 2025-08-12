'use client'

import { useCallback, useRef } from 'react'

import StrategiesItem from '@/app/(dashboard)/_ui/strategies-item'
import { useGetMyStrategyList } from '@/app/(dashboard)/my/_hooks/query/use-get-my-strategy-list'
import classNames from 'classnames/bind'

import { useIntersectionObserver } from '@/shared/hooks/custom/use-intersection-observer'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)
const MyStrategyList = () => {
  const {
    data: strategyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyStrategyList()

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useIntersectionObserver({
    ref: loadMoreRef,
    onIntersect,
  })

  const strategies = strategyData?.pages.flatMap((page) => page.strategies) || []
  return (
    <>
      {!strategies.length && <p className={cx('no-strategy')}>등록된 나의 전략이 없습니다.</p>}
      {strategies.map((strategy) => (
        <StrategiesItem key={strategy.strategyId} strategiesData={strategy} type="my" />
      ))}
      <div ref={loadMoreRef} />
      {isFetchingNextPage && <div>로딩 중...</div>}
    </>
  )
}

export default MyStrategyList
