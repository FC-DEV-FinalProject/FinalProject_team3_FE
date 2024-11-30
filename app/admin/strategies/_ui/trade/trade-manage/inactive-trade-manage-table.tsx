import axios from 'axios'

import withSuspense from '@/shared/utils/with-suspense'

import ManageTable from '../../shared/manage-table'
import { TradeResponseModel } from './types'

const InactiveTradeManageTable = async () => {
  const res = await axios<TradeResponseModel>('/api/admin/strategies/trade-type', {
    params: {
      activateState: false,
    },
  })

  const { result } = res.data
  const tableData = result.map(({ tradeName, tradeTypeIconUrl }) => [
    tradeName,
    <img src={tradeTypeIconUrl} alt={tradeName} key={tradeName} />,
  ])

  return <ManageTable data={tableData} domain="매매 유형" />
}

export default withSuspense(InactiveTradeManageTable, <ManageTable.Skeleton domain="매매 유형" />)
