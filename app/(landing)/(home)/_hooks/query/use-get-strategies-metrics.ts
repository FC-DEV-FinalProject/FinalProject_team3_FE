import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { getStrategiesMetrics } from '../../_api/strategies-metrics'
import { AverageMetricsChartDataModel } from '../../_ui/average-metrics-section/average-metrics-chart'

const useGetStrategiesMetrics = () => {
  return useQuery<AverageMetricsChartDataModel>({
    queryKey: [QUERY_KEY.TOTAL_STRATEGIES_METRICS],
    queryFn: getStrategiesMetrics,
  })
}

export default useGetStrategiesMetrics
