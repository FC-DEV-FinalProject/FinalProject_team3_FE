'use client'

import { useState } from 'react'

import Select from '@/shared/ui/select'

import usePatchUserRole from '../_hooks/query/use-patch-user-role'
import { investorOptions, traderOptions } from '../constants'
import { AdminUserInfoModel, AdminUserRoleType } from '../types'

interface Props {
  data: AdminUserInfoModel
}

const RoleSelect = ({ data }: Props) => {
  const { userId, role } = data
  const castAdmin = (role: AdminUserRoleType) =>
    role === 'INVESTOR_ADMIN' || role === 'TRADER_ADMIN' ? 'ADMIN' : role
  const [value, setValue] = useState<AdminUserRoleType>(role)
  const options = role.includes('TRADER') ? traderOptions : investorOptions

  const { mutate } = usePatchUserRole(userId, castAdmin(value))

  return (
    <Select
      value={value}
      onChange={(v) => {
        setValue(v as AdminUserRoleType)
        mutate()
      }}
      options={options}
      key={userId}
    />
  )
}

export default RoleSelect
