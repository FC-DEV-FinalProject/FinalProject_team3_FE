'use client'

import { CSSProperties } from 'react'

import { Button } from '@/shared/ui/button'

const TradePostButton = () => {
  return (
    <Button variant="filled" size="small" style={buttonStyles}>
      매매 유형 등록하기
    </Button>
  )
}

const buttonStyles: CSSProperties = {
  position: 'absolute',
  top: '-144px',
  right: 0,
  padding: '12px 24px',
}

export default TradePostButton
