import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../shared/manage-table'
import useTradeData from './hooks/use-trades-data'

const InactiveTradeManageTable = () => {
  const { data } = useTradeData('inactive')
  const tableData =
    data?.result?.map(({ tradeName, tradeTypeIconUrl, tradeTypeId }) => [
      tradeName,
      <img src={tradeTypeIconUrl} alt={tradeName} key={tradeName} />,
    ]) ?? []
  return <ManageTable data={tableData} domain="매매 유형" />
}

export default withSuspense(InactiveTradeManageTable, <ManageTable.Skeleton domain="매매 유형" />)
