import React from 'react'

import StrategiesItemSkeleton from '../_ui/strategies-item/skeleton'

const StrategiesLoading = () => {
  return (
    <div>
      {Array.from({ length: 8 }, (_, idx) => (
        <StrategiesItemSkeleton key={idx} />
      ))}
    </div>
  )
}

export default StrategiesLoading
