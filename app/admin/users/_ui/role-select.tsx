'use client'

import { useState } from 'react'

import Select from '@/shared/ui/select'

import usePatchUserRole from '../_hooks/query/use-patch-user-role'
import { InvestorOptions, TraderOptions } from '../constants'
import { AdminPatchUserRoleType, AdminUserInfoModel, AdminUserRoleType } from '../types'

interface Props {
  data: AdminUserInfoModel
}

const RoleSelect = ({ data }: Props) => {
  const { userId, role } = data
  const castAdmin = (role: AdminUserRoleType) =>
    role === 'INVESTOR_ADMIN' || role === 'TRADER_ADMIN' ? 'ADMIN' : role
  const [value, setValue] = useState<AdminPatchUserRoleType>(castAdmin(role))
  const options = role.includes('TRADER') ? TraderOptions : InvestorOptions

  const { mutate } = usePatchUserRole(userId, value)

  return (
    <Select
      value={role}
      onChange={(v) => {
        setValue(castAdmin(v as AdminUserRoleType))
        mutate()
      }}
      options={options}
      key={userId}
    />
  )
}

export default RoleSelect
