import { CSSProperties } from 'react'

import { Button } from '@/shared/ui/button'

const addIndexAndButton = (data: any[][], active?: boolean) => {
  return data?.map((d, idx) => [
    idx + 1,
    ...d,
    <Button variant={active ? 'outline' : 'filled'} size="small" style={buttonStyles} key={idx}>
      {active ? '비활성화' : '활성화'}
    </Button>,
  ])
}

const buttonStyles: CSSProperties = {
  height: '30px',
  padding: '7px 16px',
  margin: '15px 0',
}

export default addIndexAndButton
