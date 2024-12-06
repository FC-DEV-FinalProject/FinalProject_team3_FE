'use client'

import { useState } from 'react'

import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../../shared/manage-table'
import setAdminStockManageTableData from '../_api/set-admin-stock-manage-table-data'
import useStocksData from '../_hooks/query/use-stocks-data'

const TABLE_BODY_SIZE = 10

const InactiveTradeManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useStocksData('inactive', currentPage, TABLE_BODY_SIZE)
  if (!data) return null

  const tableData = setAdminStockManageTableData(data)

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

export default withSuspense(
  InactiveTradeManageTable,
  <ManageTable.Skeleton size={10} domain="종목" />
)
