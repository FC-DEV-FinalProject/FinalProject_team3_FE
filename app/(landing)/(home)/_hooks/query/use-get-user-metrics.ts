import { useQuery } from '@tanstack/react-query'

import { getUserMetrics } from '../../_api/user-metrics'
import { UserMetricsModel } from '../../types'

const useGetUserMetrics = () => {
  return useQuery<UserMetricsModel>({
    queryKey: ['userMetrics'],
    queryFn: getUserMetrics,
  })
}

export default useGetUserMetrics
