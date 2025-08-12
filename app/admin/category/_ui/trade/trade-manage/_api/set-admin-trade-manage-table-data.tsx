import Image from 'next/image'

import { Button } from '@/shared/ui/button'
import { calculateTableNumber } from '@/shared/utils/table'

import InactiveTradeDeleteButton from '../_ui/inactive-trade-delete-button'
import TradeActiveStateToggleButton from '../_ui/trade-active-state-toggle-button'
import { TradeResponseModel } from '../types'

interface Props {
  data: TradeResponseModel['result']
  isActive: boolean
  page: number
  countPerPage: number
}

const setAdminTradeManageTableData = ({ data, isActive, page, countPerPage }: Props) =>
  data?.map((data, idx) => [
    calculateTableNumber({ page, idx, countPerPage }),
    data.tradeName,
    <Image
      src={data.tradeTypeIconUrl}
      alt={data.tradeName}
      width={24}
      height={24}
      key={data.tradeTypeId}
    />,
    <Button.ButtonGroup key={data.tradeTypeId}>
      <TradeActiveStateToggleButton
        active={isActive}
        tradeTypeId={data.tradeTypeId}
        key={data.tradeTypeId}
      />
      {!isActive && <InactiveTradeDeleteButton tradeTypeId={data.tradeTypeId} />}
    </Button.ButtonGroup>,
  ]) ?? []

export default setAdminTradeManageTableData
