import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { getUserMetrics } from '../../_api/user-metrics'
import { UserMetricsModel } from '../../types'

const useGetUserMetrics = () => {
  return useQuery<UserMetricsModel>({
    queryKey: [QUERY_KEY.USER_METRICS],
    queryFn: getUserMetrics,
  })
}

export default useGetUserMetrics
