import axiosInstance from '@/shared/api/axios'

export interface DeleteQuestionProps {
  strategyId: number
  questionId: number
}

const deleteQuestion = async ({ strategyId, questionId }: DeleteQuestionProps) => {
  try {
    const response = await axiosInstance.delete(
      `/api/strategies/${strategyId}/questions/${questionId}`
    )
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
    throw new Error('문의 내역 삭제에 실패했습니다.')
  }
}

export default deleteQuestion
