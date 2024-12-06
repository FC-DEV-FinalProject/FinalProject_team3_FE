import axiosInstance from '@/shared/api/axios'

const deleteReview = async (strategyId: number, reviewId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/strategies/${strategyId}/reviews/${reviewId}`)
    return response.data.isSuccess
  } catch (err) {
    console.error(err)
  }
}

export default deleteReview
