import axios from 'axios'

import { COUNT_PER_PAGE } from '../_ui/review-container/review-list'

const getReviews = async (strategyId: number, page: number | undefined) => {
  if (!strategyId && !page) return

  try {
    const response = await axios.get(
      `/api/strategies/${strategyId}/reviews?page=${page}&size=${COUNT_PER_PAGE}`
    )
    const data = await response.data
    return data
  } catch (err) {
    console.error(err, '리뷰 데이터 가져오기 실패')
  }
}

export default getReviews
