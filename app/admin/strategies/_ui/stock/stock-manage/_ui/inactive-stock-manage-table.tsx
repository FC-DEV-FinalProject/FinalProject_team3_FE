import { useState } from 'react'

import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../../shared/manage-table'
import useStocksData from '../_hooks/query/use-stocks-data'
import StockActiveStateToggleButton from './stock-active-state-toggle-button'

const TABLE_BODY_SIZE = 10

const InactiveTradeManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useStocksData('inactive', currentPage, TABLE_BODY_SIZE)
  const tableData =
    data?.result?.content.map(({ stockTypeName, stockTypeIconUrl, stockTypeId }) => [
      stockTypeName,
      <img src={stockTypeIconUrl} alt={stockTypeName} key={stockTypeName} />,
      <StockActiveStateToggleButton stockTypeId={stockTypeId} key={stockTypeId} />,
    ]) ?? []

  return (
    <ManageTable
      data={tableData}
      size={TABLE_BODY_SIZE}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      maxPage={data?.result.totalPages}
      active
      domain="종목"
    />
  )
}

export default withSuspense(InactiveTradeManageTable, <ManageTable.Skeleton domain="종목" />)
