import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getTrades from '../../_api/get-trades'

type ArgType = 'active' | 'inactive'

const useTradeData = (activateState: ArgType) => {
  const isActive = activateState === 'active' ? true : false

  return useQuery({
    queryKey: [QUERY_KEY.ADMIN_TRADES, activateState],
    queryFn: () => getTrades(isActive),
  })
}

export default useTradeData
