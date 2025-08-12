import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getNotices from '../_api/get-notice'

interface Props {
  page?: number
  size?: number
}

const useGetNotices = ({ page, size }: Props = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTICES, page, size],
    queryFn: () => getNotices({ page, size }),
  })
}

export default useGetNotices
