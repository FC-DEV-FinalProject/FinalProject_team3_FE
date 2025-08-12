import { useRouter } from 'next/navigation'

import { NoticeFormModel } from '@/app/admin/notices/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import axiosInstance from '@/shared/api/axios'
import { QUERY_KEY } from '@/shared/constants/query-key'
import uploadFilesWithPresignedUrl from '@/shared/utils/upload-files-with-presigned-url'

import { PatchNoticeResponseModel } from '../../types'

const usePatchNotice = (formData: NoticeFormModel, noticeId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { existingFiles, newFiles } = formData

      const allFilePaths = [
        ...(existingFiles?.map((file) => file.fileName) ?? []),
        ...(newFiles?.map((file) => file.name) ?? []),
      ]

      const allSizes = [
        ...(existingFiles?.map((_) => 0) ?? []),
        ...(newFiles?.map((file) => file.size) ?? []),
      ]

      const uploadResponse = await axiosInstance.patch<PatchNoticeResponseModel>(
        `/api/admin/notices/${noticeId}`,
        {
          title: formData.title,
          content: formData.content,
          filePaths: allFilePaths,
          sizes: allSizes,
        }
      )

      if (!newFiles?.length) return

      const presignedUrls = uploadResponse.data.result
      await uploadFilesWithPresignedUrl(newFiles, presignedUrls)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.NOTICES],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.NOTICE_DETAIL, noticeId],
      })
      router.replace('/admin/notices')
    },
  })
}

export default usePatchNotice
