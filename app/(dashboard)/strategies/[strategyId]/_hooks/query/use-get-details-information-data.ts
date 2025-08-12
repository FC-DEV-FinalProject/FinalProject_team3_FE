import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'
import { StrategyDetailsInformationModel } from '@/shared/types/strategy-data'

import getDetailsInformation from '../../_api/get-details-information'
import { InformationType } from '../../page'

interface Props {
  strategyId: number
}

const useGetDetailsInformationData = ({
  strategyId,
}: Props): UseQueryResult<{
  detailsSideData: InformationType[]
  detailsInformationData: StrategyDetailsInformationModel
}> => {
  return useQuery({
    queryKey: [QUERY_KEY.STRATEGY_DETAILS, strategyId],
    queryFn: () => getDetailsInformation(strategyId),
  })
}

export default useGetDetailsInformationData
