import axiosInstance from '@/shared/api/axios'

import { StrategiesPatchResponseModel, StrategiesPublicStateType } from '../types'

const patchAdminStrategyPublic = async (
  strategyId: number,
  isPublic: StrategiesPublicStateType
) => {
  try {
    const res = await axiosInstance.patch<StrategiesPatchResponseModel>(
      `/api/my-strategies/${strategyId}/visibility`,
      {
        isPublic: isPublic === 'PUBLIC' ? true : false,
      }
    )

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default patchAdminStrategyPublic
