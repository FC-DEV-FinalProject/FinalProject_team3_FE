import axios from 'axios'

import axiosInstance from '@/shared/api/axios'

import { PostReviewErrModel } from '../_hooks/query/use-post-review'

const postReview = async (
  strategyId: number,
  content: { content: string; starRating: number }
): Promise<boolean | undefined | PostReviewErrModel> => {
  try {
    const response = await axiosInstance.post(`/api/strategies/${strategyId}/reviews`, content)
    return response.data.isSuccess
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
    console.error(err)
  }
}

export default postReview
