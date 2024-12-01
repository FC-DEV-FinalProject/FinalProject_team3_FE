'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  basePath: string
  pageSize: number
}

interface UsePaginationReturnModel {
  page: number
  size: number
  handlePageChange: (page: number) => void
}

export const usePagination = ({ basePath, pageSize }: Props): UsePaginationReturnModel => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = parseInt(searchParams?.get('page') || '1')
  const size = parseInt(searchParams?.get('size') || '1')

  useEffect(() => {
    if (!searchParams.size) {
      router.push(`${basePath}?page=1&size=${pageSize}`)
    }
  }, [searchParams, router, basePath, pageSize])

  const handlePageChange = (page: number) => {
    router.push(`${basePath}?page=${page}&size=${pageSize}`)
  }

  return {
    page,
    size,
    handlePageChange,
  }
}
