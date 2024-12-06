import { useQuery } from '@tanstack/react-query'

import getTraderStrategies from '../_api/get-trader-details'

interface Props {
  traderId: number
}

const useGetTraderStrategies = ({ traderId }: Props) => {
  return useQuery({
    queryKey: ['trader-strategies', traderId],
    queryFn: () => getTraderStrategies({ traderId }),
    enabled: !!traderId,
  })
}

export default useGetTraderStrategies
