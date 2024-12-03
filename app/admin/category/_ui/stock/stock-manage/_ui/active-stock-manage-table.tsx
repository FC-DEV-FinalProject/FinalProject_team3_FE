'use client'

import { useState } from 'react'

import Image from 'next/image'

import ManageTable from '../../../shared/manage-table'
import useStocksData from '../_hooks/query/use-stocks-data'
import StockActiveStateToggleButton from './stock-active-state-toggle-button'

const TABLE_BODY_SIZE = 10

const ActiveStockManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: initialData, isLoading: isLoadingInitial } = useStocksData(
    'active',
    currentPage,
    TABLE_BODY_SIZE
  )

  const isUnderflow = initialData?.content.length === 0 && !initialData?.first

  if (isUnderflow) setCurrentPage((prev) => prev - 1)

  const { data: fallbackData, isLoading: isLoadingFallback } = useStocksData(
    'active',
    currentPage - 1,
    TABLE_BODY_SIZE,
    isUnderflow
  )

  const data = initialData ?? fallbackData
  const tableData =
    data?.content.map(({ stockTypeName, stockTypeIconUrl, stockTypeId }) => [
      stockTypeName,
      <Image
        src={stockTypeIconUrl}
        alt={stockTypeName}
        width={24}
        height={24}
        key={stockTypeName}
      />,
      <StockActiveStateToggleButton stockTypeId={stockTypeId} active key={stockTypeId} />,
    ]) ?? []

  if (isLoadingInitial || isLoadingFallback) return <ManageTable.Skeleton domain="종목" />

  return (
    <ManageTable
      data={tableData}
      size={TABLE_BODY_SIZE}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      maxPage={data?.totalPages}
      active
      domain="종목"
    />
  )
}

export default ActiveStockManageTable
