import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

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

  const { data: strategyTypes, isLoading: isTypesLoading } = useQuery<
    StrategyTypeResponseModel,
    AxiosError<ErrorResponseModel>
  >({
    queryKey: ['strategyTypes'],
    queryFn: () => strategyApi.getStrategyTypes().then((response) => response.data),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation<
    StrategyResponseModel,
    AxiosError<ErrorResponseModel>,
    StrategyModel
  >({
    mutationFn: (data) => strategyApi.registerStrategy(data).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addStrategies'],
      })
      router.back()
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || '전략 등록에 실패했습니다.'
      setError(errorMessage)
    },
  })

  return {
    strategyTypes: strategyTypes?.result,
    isTypesLoading,
    registerStrategy: mutation.mutate,
    isRegistering: mutation.isPending,
    error,
  }
}
