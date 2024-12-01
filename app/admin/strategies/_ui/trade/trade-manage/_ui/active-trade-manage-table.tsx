import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../../shared/manage-table'
import useTradeData from '../_hooks/use-trades-data'
import TradeActiveStateToggleButton from './trade-active-state-toggle-button'

const ActiveTradeManageTable = () => {
  const { data } = useTradeData('active')
  const tableData =
    data?.result?.map(({ tradeName, tradeTypeIconUrl, tradeTypeId }) => [
      tradeName,
      <img src={tradeTypeIconUrl} alt={tradeName} key={tradeName} />,
      <TradeActiveStateToggleButton tradeTypeId={tradeTypeId} active key={tradeTypeId} />,
    ]) ?? []

  return <ManageTable data={tableData} active domain="매매 유형" />
}

export default withSuspense(ActiveTradeManageTable, <ManageTable.Skeleton domain="매매 유형" />)
