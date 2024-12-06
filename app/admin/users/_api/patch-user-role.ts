import axiosInstance from '@/shared/api/axios'

import { AdminPatchUserRoleType, PatchUserRoleResponeseModel } from '../types'

const patchAdminUserRole = async (userId: number, newRole: AdminPatchUserRoleType) => {
  try {
    const res = await axiosInstance.patch<PatchUserRoleResponeseModel>(
      `/api/admin/users/${userId}/role`,
      {
        newRole,
      }
    )

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default patchAdminUserRole
