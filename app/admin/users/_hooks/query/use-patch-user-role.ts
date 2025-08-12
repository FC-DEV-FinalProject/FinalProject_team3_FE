import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import patchAdminUserRole from '../../_api/patch-user-role'
import { AdminPatchUserRoleType } from '../../types'

const usePatchUserRole = (userId: number, newRole: AdminPatchUserRoleType) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => patchAdminUserRole(userId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_USERS] })
    },
  })
}

export default usePatchUserRole
