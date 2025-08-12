import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getStocks from '../../_api/get-stocks'

type ArgType = 'active' | 'inactive'

const useStocksData = (activateState: ArgType, page: number = 1, size: number = 10) => {
  const isActive = activateState === 'active' ? true : false

  return useQuery({
    queryKey: [QUERY_KEY.ADMIN_STOCKS, activateState, page, size],
    queryFn: () => getStocks(isActive, page, size),
  })
}

export default useStocksData
