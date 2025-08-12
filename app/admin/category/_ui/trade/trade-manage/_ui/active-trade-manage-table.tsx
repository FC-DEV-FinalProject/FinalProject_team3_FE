import ManageTable from '../../../shared/manage-table'
import setAdminTradeManageTableData from '../_api/set-admin-trade-manage-table-data'
import useTradeData from '../_hooks/query/use-trades-data'

const ActiveTradeManageTable = () => {
  const { data } = useTradeData('active')
  if (!data) return null

  const tableData = setAdminTradeManageTableData({
    data,
    isActive: true,
    page: 1,
    countPerPage: 10,
  })

  return <ManageTable data={tableData} active domain="매매 유형" />
}

export default ActiveTradeManageTable
