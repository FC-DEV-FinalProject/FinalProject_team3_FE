import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import patchStrategyApproval from '../../_api/patch-strategy-approval'

const usePatchStrategyApproval = (strategyId: number, isApproved: 'APPROVED' | 'DENY') => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => patchStrategyApproval(strategyId, isApproved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_STRATEGIES] })
    },
  })
}

export default usePatchStrategyApproval
