import axiosInstance from '@/shared/api/axios'
import { REVIEW_PAGE_COUNT } from '@/shared/constants/count-per-page'

const getReviews = async (strategyId: number, page: number | undefined) => {
  if (!strategyId && !page) return

  try {
    const response = await axiosInstance.get(
      `/api/strategies/${strategyId}/reviews?userId=1&page=${page}&size=${REVIEW_PAGE_COUNT}`
    )
    const data = await response.data.result
    return data
  } catch (err) {
    console.error(err, '리뷰 데이터 가져오기 실패')
  }
}

export default getReviews
