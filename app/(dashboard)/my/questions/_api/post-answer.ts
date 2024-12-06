import axiosInstance from '@/shared/api/axios'

const postAnswer = async (questionId: number, content: string) => {
  try {
    const response = await axiosInstance.post(`/api/trader/questions/${questionId}/answers`, {
      content,
    })
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
    throw new Error('답변 등록에 실패했습니다.')
  }
}

export default postAnswer
