import { useMutation, useQueryClient } from '@tanstack/react-query'

import patchStrategyApproval from '../../_api/patch-strategy-approval'

const usePatchStrategyApproval = (strategyId: number, isApproved: 'APPROVED' | 'DENY') => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => patchStrategyApproval(strategyId, isApproved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStrategies'] })
    },
  })
}

export default usePatchStrategyApproval
