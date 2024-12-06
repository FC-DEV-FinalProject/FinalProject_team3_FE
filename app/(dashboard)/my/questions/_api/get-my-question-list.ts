import axiosInstance from '@/shared/api/axios'
import { UserType } from '@/shared/types/auth'
import {
  QuestionModel,
  QuestionSearchConditionType,
  QuestionStateTapType,
} from '@/shared/types/questions'

interface Props {
  userType: UserType
  page?: number
  size?: number
  keyword?: string
  searchCondition?: QuestionSearchConditionType
  stateCondition: QuestionStateTapType
}

interface QuestionReturnModel {
  content: QuestionModel[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

const getMyQuestionList = async ({
  userType,
  page = 1,
  size = 3,
  keyword = '',
  searchCondition = 'CONTENT',
  stateCondition,
}: Props): Promise<QuestionReturnModel> => {
  try {
    const response = await axiosInstance.get(
      `/api/${userType.toLowerCase()}/questions?page=${page}&size=${size}&keyword=${keyword}&searchCondition=${searchCondition}&stateCondition=${stateCondition}`
    )
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('문의 목록 조회에 실패했습니다.')
  }
}

export default getMyQuestionList
