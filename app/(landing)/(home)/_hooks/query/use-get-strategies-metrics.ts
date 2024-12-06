import { useQuery } from '@tanstack/react-query'

import { getStrategiesMetrics } from '../../_api/strategies-metrics'
import { AverageMetricsChartDataModel } from '../../_ui/average-metrics-section/average-metrics-chart'

const useGetStrategiesMetrics = () => {
  return useQuery<AverageMetricsChartDataModel>({
    queryKey: ['totalStrategiesMetrics'],
    queryFn: getStrategiesMetrics,
  })
}

export default useGetStrategiesMetrics
