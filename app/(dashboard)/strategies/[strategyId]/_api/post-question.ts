import axiosInstance from '@/shared/api/axios'
import { APIResponseBaseModel } from '@/shared/types/response'

interface PostQuestionsReturnModel extends APIResponseBaseModel<boolean> {
  result: object
}

const postQuestion = async (
  strategyId: number,
  title: string,
  content: string
): Promise<PostQuestionsReturnModel | null | undefined> => {
  try {
    const response = await axiosInstance.post(`/api/strategies/${strategyId}/questions`, {
      title,
      content,
    })
    return response.data
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '문의 등록 실패')
  }
}

export default postQuestion
