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
  const size = parseInt(searchParams?.get('size') || `${pageSize}`)

  useEffect(() => {
    if (!searchParams.size) {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(page))
      params.set('size', String(size))
      router.replace(`${basePath}?${params.toString()}`)
    }
  }, [searchParams, router, basePath, pageSize, size, page])

  const handlePageChange = (page: number) => {
    router.push(`${basePath}?page=${page}&size=${pageSize}`)
  }

  return {
    page,
    size,
    handlePageChange,
  }
}
