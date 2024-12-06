import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../../shared/manage-table'
import setAdminTradeManageTableData from '../_api/set-admin-trade-manage-table-data'
import useTradeData from '../_hooks/query/use-trades-data'

const ActiveTradeManageTable = () => {
  const { data } = useTradeData('active')
  if (!data) return null

  const tableData = setAdminTradeManageTableData(data.result)

  return <ManageTable data={tableData} active domain="매매 유형" />
}

export default withSuspense(
  ActiveTradeManageTable,
  <ManageTable.Skeleton active size={10} domain="매매 유형" />
)
