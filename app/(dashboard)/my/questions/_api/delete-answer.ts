import axiosInstance from '@/shared/api/axios'

export interface DeleteAnswerProps {
  questionId: number
  answerId: number
}

const deleteAnswer = async ({ questionId, answerId }: DeleteAnswerProps) => {
  try {
    const response = await axiosInstance.delete(
      `/api/trader/questions/${questionId}/answers/${answerId}`
    )
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
    throw new Error('답변 삭제에 실패했습니다.')
  }
}

export default deleteAnswer
