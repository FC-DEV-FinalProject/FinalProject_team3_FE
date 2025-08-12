import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getTraderStrategies from '../_api/get-trader-details'

interface Props {
  traderId: number
}

const useGetTraderStrategies = ({ traderId }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.TRADER_STRATEGIES, traderId],
    queryFn: () => getTraderStrategies({ traderId }),
    enabled: !!traderId,
  })
}

export default useGetTraderStrategies
