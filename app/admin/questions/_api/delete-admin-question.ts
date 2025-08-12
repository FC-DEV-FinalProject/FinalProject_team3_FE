import axiosInstance from '@/shared/api/axios'

import { AdminQuestionsResponseModel } from '../types'

interface ArgModel {
  strategyId: number
  questionId: number
}
const deleteAdminQuestion = async ({ strategyId, questionId }: ArgModel) => {
  try {
    const res = await axiosInstance.delete<AdminQuestionsResponseModel>(
      `/api/admin/strategies/${strategyId}/questions/${questionId}`
    )
    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)
    return res.data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}
export default deleteAdminQuestion
