import Avatar from '@/shared/ui/avatar'

import RoleSelect from '../_ui/role-select'
import UserDeleteButton from '../_ui/user-delete-button'
import { AdminUserInfoModel } from '../types'

const setTableBody = (data: AdminUserInfoModel[]) =>
  data.map((data, idx) => {
    return [
      idx + 1,
      <Avatar src={data?.imageUrl ?? undefined} key={data.userId} />,
      data.userName,
      data.nickname,
      data.email,
      data.phone,
      <RoleSelect data={data} key={data.userId} />,
      <UserDeleteButton userId={data.userId} key={data.userId} />,
    ]
  })

export default setTableBody
