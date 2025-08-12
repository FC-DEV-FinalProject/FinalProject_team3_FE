import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { deleteAccountImages } from '../../_api/post-account-image'

interface DeleteAccountImagesRequestModel {
  strategyId: number
  imageIds: number[]
}

export const useDeleteAccountImages = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: DeleteAccountImagesRequestModel) => deleteAccountImages(request),
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_ACCOUNT_IMAGES, request.strategyId],
      })
    },
  })
}
