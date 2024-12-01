import { useQuery } from '@tanstack/react-query'

import getAnalysisChart from '../../_api/get-analysis-chart'
import { AnalysisChartOptionsType } from '../../_ui/analysis-container'

interface Props {
  strategyId: number
  firstOption: AnalysisChartOptionsType
  secondOption: AnalysisChartOptionsType
}

const useGetAnalysisChart = ({ strategyId, firstOption, secondOption }: Props) => {
  return useQuery({
    queryKey: ['analysisChart', strategyId, firstOption, secondOption],
    queryFn: () => getAnalysisChart(strategyId, firstOption, secondOption),
  })
}

export default useGetAnalysisChart
