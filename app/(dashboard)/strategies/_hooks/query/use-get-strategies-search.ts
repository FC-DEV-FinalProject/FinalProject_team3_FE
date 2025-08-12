import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getStrategiesSearch from '../../_api/get-strategies-search'

const useGetStrategiesSearch = () => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGY_SEARCH],
    queryFn: getStrategiesSearch,
  })
}

export default useGetStrategiesSearch
