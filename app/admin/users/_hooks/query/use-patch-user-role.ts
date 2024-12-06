import { useMutation, useQueryClient } from '@tanstack/react-query'

import patchAdminUserRole from '../../_api/patch-user-role'
import { AdminPatchUserRoleType } from '../../types'

const usePatchUserRole = (userId: number, newRole: AdminPatchUserRoleType) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => patchAdminUserRole(userId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] })
    },
  })
}

export default usePatchUserRole
