import axiosInstance from '@/shared/api/axios'

const postReview = async (
  strategyId: number,
  content: { content: string; starRating: number }
): Promise<boolean | null> => {
  try {
    const response = await axiosInstance.post(`/api/strategies/${strategyId}/reviews`, content)
    return response.data.isSuccess
  } catch (err) {
    console.error(err, '리뷰 등록 실패')
    return null
  }
}

export default postReview
