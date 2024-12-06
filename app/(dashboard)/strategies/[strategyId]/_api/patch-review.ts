import axiosInstance from '@/shared/api/axios'

const patchReview = async (
  strategyId: number,
  reviewId: number,
  content: { content: string; starRating: number }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/strategies/${strategyId}/reviews/${reviewId}`,
      content
    )
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default patchReview
