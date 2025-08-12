import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import getAdminUsers from '../../_api/get-admin-users'

interface ArgModel {
  role: string
  condition: string | null
  keyword: string | null
  page?: number
  size?: number
}

const useAdminUsers = ({ role, condition, keyword, page, size }: ArgModel) => {
  return useQuery({
    queryKey: [QUERY_KEY.ADMIN_USERS, [role, condition, keyword, page, size]],
    queryFn: () => getAdminUsers({ role, condition, keyword, page, size }),
  })
}

export default useAdminUsers
