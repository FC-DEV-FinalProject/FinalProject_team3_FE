import { useQuery } from '@tanstack/react-query'

import getStrategiesSearch from '../../_api/get-strategies-search'

const useGetStrategiesSearch = () => {
  return useQuery({
    queryKey: ['strategiesSearch'],
    queryFn: getStrategiesSearch,
  })
}

export default useGetStrategiesSearch
