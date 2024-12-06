import { useMutation, useQueryClient } from '@tanstack/react-query'

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
        queryKey: ['myAccountImages', request.strategyId],
      })
    },
  })
}
