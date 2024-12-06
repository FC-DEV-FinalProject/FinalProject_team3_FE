import { useMutation } from '@tanstack/react-query'

import getProposalDownload from '../../_api/get-proposal-download'

const useGetProposalDownload = () => {
  return useMutation({
    mutationFn: ({ strategyId, name }: { strategyId: number; name: string }) =>
      getProposalDownload(strategyId, name),
  })
}

export default useGetProposalDownload
