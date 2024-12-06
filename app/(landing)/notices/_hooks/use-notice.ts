import { useQuery } from '@tanstack/react-query'

import getNotices from '../_api/get-notice'

interface Props {
  page?: number
  size?: number
}

const useGetNotices = ({ page, size }: Props = {}) => {
  return useQuery({
    queryKey: ['notices', page, size],
    queryFn: () => getNotices({ page, size }),
  })
}

export default useGetNotices
