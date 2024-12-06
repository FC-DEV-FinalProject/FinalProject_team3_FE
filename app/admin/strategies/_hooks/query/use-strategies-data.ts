import { useQuery } from '@tanstack/react-query'

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
    queryKey: ['adminStrategies', { searchWord, isApproved, page, size }],
    queryFn: () => getStrategies({ searchWord, isApproved, page, size }),
  })
}

export default useStrategiesData
