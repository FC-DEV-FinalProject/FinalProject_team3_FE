import axiosInstance from '@/shared/api/axios'
import { QuestionSearchConditionType, QuestionStateTapType } from '@/shared/types/questions'

import { AdminQuestionsResponseModel } from '../types'

interface ArgModel {
  keyword: string | null
  searchCondition: QuestionSearchConditionType
  stateCondition: QuestionStateTapType
  page?: number
  size?: number
}

const getAdminQuestions = async ({
  keyword = null,
  searchCondition,
  stateCondition,
  page = 1,
  size = 10,
}: ArgModel) => {
  try {
    const res = await axiosInstance<AdminQuestionsResponseModel>('/api/admin/questions', {
      params: {
        keyword,
        searchCondition,
        stateCondition,
        page,
        size,
      },
    })

    if (!res.data.isSuccess) throw new Error('Error with code' + res.data.code)

    return res.data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default getAdminQuestions
