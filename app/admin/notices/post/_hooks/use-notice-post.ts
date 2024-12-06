import { useMutation, useQueryClient } from '@tanstack/react-query'

import postNotice from '../_api/post-notice'
import { NoticeFormModel } from '../types'

const usePostNotice = (formData: NoticeFormModel) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => postNotice(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
      })
    },
    onError: (err) => {
      console.error('Error : ', err)
    },
  })
}

export default usePostNotice
