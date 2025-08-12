import getNotices from '@/app/(landing)/notices/_api/get-notice'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

interface Props {
  page?: number
  size?: number
}

const useAdminNotices = ({ page, size }: Props = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTICES, page, size],
    queryFn: () => getNotices({ page, size }),
  })
}

export default useAdminNotices
