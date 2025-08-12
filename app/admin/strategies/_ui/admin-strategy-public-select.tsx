'use client'

import { useState } from 'react'

import Select from '@/shared/ui/select'

import { strategyPublicOptions } from '../constants'
import { StrategiesPublicStateType, StrategiesResponseModel } from '../types'

interface Props {
  data: StrategiesResponseModel['result']['content'][number]
}

const AdminStrategyPublicSelect = ({ data }: Props) => {
  const { strategyId, isPublic } = data
  const [value, setValue] = useState<StrategiesPublicStateType>(isPublic)

  return (
    <Select
      value={value}
      onChange={(v) => {
        setValue(v as StrategiesPublicStateType)
      }}
      options={strategyPublicOptions}
      key={strategyId}
    />
  )
}

export default AdminStrategyPublicSelect
