'use client'

import { CSSProperties } from 'react'

import { Button } from '@/shared/ui/button'

import useToggoleTradeActiveState from '../_hooks/use-toggle-trade-active-state'

interface Props {
  active?: boolean
  tradeTypeId: number
}

const TradeActiveStateToggleButton = ({ active, tradeTypeId }: Props) => {
  const { mutate, isPending } = useToggoleTradeActiveState(tradeTypeId)
  const onButtonClick = () => {
    mutate()
    console.log('t', tradeTypeId)
  }

  return (
    <Button
      onClick={onButtonClick}
      variant={active ? 'outline' : 'filled'}
      size="small"
      style={buttonStyles}
      disabled={isPending}
    >
      {active ? '비활성화' : '활성화'}
    </Button>
  )
}

const buttonStyles: CSSProperties = {
  height: '30px',
  padding: '7px 16px',
  margin: '15px 0',
}
export default TradeActiveStateToggleButton
