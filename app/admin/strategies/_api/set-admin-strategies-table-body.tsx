import AdminStrategiesApproveTd from '../_ui/admin-strategies-approve-td'
import { StrategiesResponseModel } from '../types'

const setAdminStrategiesTableBody = (data: StrategiesResponseModel['result']['content']) =>
  data.map((data, idx) => {
    return [
      idx + 1,
      data.createAt,
      data.strategyName,
      data.nickname,
      data.isPublic === 'PUBLIC' ? '공개' : '비공개',
      <AdminStrategiesApproveTd
        isApproved={data.isApproved}
        strategyId={data.strategyId}
        key={data.strategyId}
      />,
    ]
  })

export default setAdminStrategiesTableBody
