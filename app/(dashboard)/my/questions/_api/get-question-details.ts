import axiosInstance from '@/shared/api/axios'
import { QuestionDetailsModel } from '@/shared/types/questions'

interface Props {
  questionId: number
}

const getQuestionDetails = async ({ questionId }: Props): Promise<QuestionDetailsModel> => {
  try {
    const response = await axiosInstance.get(`/api/questions/${questionId}`)
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('문의 목록 조회에 실패했습니다.')
  }
}

export default getQuestionDetails
