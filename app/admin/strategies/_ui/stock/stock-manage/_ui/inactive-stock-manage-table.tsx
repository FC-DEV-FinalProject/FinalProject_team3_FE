import { useState } from 'react'

import Image from 'next/image'

import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../../shared/manage-table'
import useStocksData from '../_hooks/query/use-stocks-data'
import StockActiveStateToggleButton from './stock-active-state-toggle-button'

const TABLE_BODY_SIZE = 10

const InactiveTradeManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useStocksData('inactive', currentPage, TABLE_BODY_SIZE)
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
      <StockActiveStateToggleButton stockTypeId={stockTypeId} key={stockTypeId} />,
    ]) ?? []

  return (
    <ManageTable
      data={tableData}
      size={TABLE_BODY_SIZE}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      maxPage={data?.totalPages}
      domain="종목"
    />
  )
}

export default withSuspense(InactiveTradeManageTable, <ManageTable.Skeleton domain="종목" />)
