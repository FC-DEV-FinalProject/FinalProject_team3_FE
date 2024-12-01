import { useQuery } from '@tanstack/react-query'

import getTrades from '../_api/get-trades'

type ArgType = 'active' | 'inactive'

const useTradeData = (activateState: ArgType) => {
  const isActive = activateState === 'active' ? true : false

  return useQuery({
    queryKey: ['adminTrades', activateState],
    queryFn: () => getTrades(isActive),
  })
}

export default useTradeData
