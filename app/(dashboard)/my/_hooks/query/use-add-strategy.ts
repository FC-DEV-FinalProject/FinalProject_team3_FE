import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import uploadFileWithPresignedUrl from '@/shared/api/upload-file-with-presigned-url'
import { QUERY_KEY } from '@/shared/constants/query-key'

import {
  StrategyModel,
  StrategyResponseModel,
  StrategyTypeResponseModel,
  strategyApi,
} from '../../_api/add-strategy'

interface ErrorResponseModel {
  message: string
}

export const useAddStrategy = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { data: strategyTypes, isLoading: isTypesLoading } = useQuery<
    StrategyTypeResponseModel,
    AxiosError<ErrorResponseModel>
  >({
    queryKey: [QUERY_KEY.STRATEGY_TYPES],
    queryFn: () => strategyApi.getStrategyTypes().then((response) => response.data),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const registerStrategyMutation = useMutation<
    StrategyResponseModel,
    AxiosError<ErrorResponseModel>,
    { data: StrategyModel; file?: File }
  >({
    mutationFn: async ({ data, file }) => {
      const response = await strategyApi.registerStrategy(data)

      if (file && response.data.result?.presignedUrl) {
        setIsUploading(true)
        try {
          await uploadFileWithPresignedUrl(response.data.result.presignedUrl, file)
        } catch (err) {
          console.error('File upload failed:', err)
          throw new Error('파일 업로드 중 오류가 발생했습니다.')
        } finally {
          setIsUploading(false)
        }
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_STRATEGIES],
      })
      router.back()
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || '전략 등록에 실패했습니다.'
      setError(errorMessage)
    },
  })

  const registerStrategy = async (data: StrategyModel, file?: File) => {
    await registerStrategyMutation.mutateAsync({ data, file })
  }

  return {
    strategyTypes: strategyTypes?.result,
    isTypesLoading,
    registerStrategy,
    isRegistering: registerStrategyMutation.isPending || isUploading,
    error,
  }
}
