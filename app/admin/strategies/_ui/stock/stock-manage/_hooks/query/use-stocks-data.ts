import { useQuery } from '@tanstack/react-query'

import getStocks from '../../_api/get-stocks'

type ArgType = 'active' | 'inactive'

const useStocksData = (activateState: ArgType, page: number, size: number) => {
  const isActive = activateState === 'active' ? true : false

  return useQuery({
    queryKey: ['adminStocks', activateState, page, size],
    queryFn: () => getStocks(isActive, page, size),
  })
}

export default useStocksData
