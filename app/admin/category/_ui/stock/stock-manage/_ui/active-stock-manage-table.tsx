'use client'

import { useState } from 'react'

import ManageTable from '../../../shared/manage-table'
import setAdminStockManageTableData from '../_api/set-admin-stock-manage-table-data'
import useStocksData from '../_hooks/query/use-stocks-data'

const TABLE_BODY_SIZE = 10

const ActiveStockManageTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useStocksData('active', currentPage, TABLE_BODY_SIZE)
  if (!data) return null

  const tableData = setAdminStockManageTableData({
    data,
    isActive: true,
    page: currentPage,
    countPerPage: TABLE_BODY_SIZE,
  })

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
