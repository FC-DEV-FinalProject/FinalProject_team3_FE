import Avatar from '@/shared/ui/avatar'
import { calculateTableNumber } from '@/shared/utils/table'

import RoleSelect from '../_ui/role-select'
import UserDeleteButton from '../_ui/user-delete-button'
import { AdminUserInfoModel } from '../types'

interface ArgModel {
  data: AdminUserInfoModel[]
  page: number
  countPerPage: number
}

const setTableBody = ({ data, page, countPerPage }: ArgModel) =>
  data.map((data, idx) => {
    return [
      calculateTableNumber({ page, idx, countPerPage }),
      <Avatar src={data?.imageUrl ?? undefined} key={data.userId} />,
      data.userName,
      data.nickname,
      data.joinDate,
      data.email,
      data.phone,
      <RoleSelect data={data} key={data.userId} />,
      <UserDeleteButton userId={data.userId} key={data.userId} />,
    ]
  })

export default setTableBody
