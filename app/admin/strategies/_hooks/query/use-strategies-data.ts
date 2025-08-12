import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getStrategies from '../../_api/get-strategies'
import { StrategiesApprovalStateType } from '../../types'

interface ArgModel {
  searchWord?: string
  isApproved?: StrategiesApprovalStateType
  page?: number
  size?: number
}

const useStrategiesData = ({ searchWord, isApproved, page, size }: ArgModel) => {
  return useQuery({
    queryKey: [QUERY_KEY.ADMIN_STRATEGIES, { searchWord, isApproved, page, size }],
    queryFn: () => getStrategies({ searchWord, isApproved, page, size }),
  })
}

export default useStrategiesData
