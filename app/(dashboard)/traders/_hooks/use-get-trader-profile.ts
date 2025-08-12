import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { getTraderProfile } from '../_api/get-trader-profile'

const useGetTraderProfile = (traderId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.TRADERS, traderId],
    queryFn: () => getTraderProfile(traderId),
  })
}
export default useGetTraderProfile
