import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { uploadAccountImages } from '../../_api/post-account-image'

interface UseUploadAccountImagesProps {
  strategyId: number
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export const useUploadAccountImages = ({
  strategyId,
  onSuccess,
  onError,
}: UseUploadAccountImagesProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (files: { title: string; imageFile: File }[]) => {
      const uploadData = files.map(({ title, imageFile }) => ({
        fileName: imageFile.name,
        fileSize: imageFile.size,
        title,
      }))
      const response = await uploadAccountImages(strategyId, uploadData)

      const { presignedUrls } = response.result
      const uploadPromises = files.map(({ imageFile }, index) => {
        return fetch(presignedUrls[index].presignedUrl, {
          method: 'PUT',
          body: imageFile,
          headers: {
            'Content-Type': imageFile.type,
          },
        })
      })

      await Promise.all(uploadPromises)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_ACCOUNT_IMAGES, strategyId],
        exact: true,
      })

      onSuccess?.()
    },
    onError,
  })
}
