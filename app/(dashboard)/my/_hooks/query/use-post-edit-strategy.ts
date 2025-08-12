import { useMutation, useQueryClient } from '@tanstack/react-query'

import uploadFileWithPresignedUrl from '@/shared/api/upload-file-with-presigned-url'
import { QUERY_KEY } from '@/shared/constants/query-key'

import postEditStrategy, {
  ContentModel,
  EditStrategyResponseModel,
} from '../../_api/post-edit-strategy'

const usePostEditStrategy = () => {
  const queryClient = useQueryClient()

  return useMutation<
    EditStrategyResponseModel,
    unknown,
    { strategyId: number; information: ContentModel; file?: File }
  >({
    mutationFn: async ({ strategyId, information, file }) => {
      const response = await postEditStrategy(strategyId, information)

      if (file && information.proposalModified && response.result.presignedUrl) {
        await uploadFileWithPresignedUrl(response.result.presignedUrl, file)
      }
      return response
    },
    onSuccess: (_, { strategyId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.STRATEGY_DETAILS, strategyId] })
    },
  })
}

export default usePostEditStrategy
