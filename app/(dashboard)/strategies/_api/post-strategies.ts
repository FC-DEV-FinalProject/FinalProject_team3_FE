import axiosInstance from '@/shared/api/axios'

import { SearchTermsModel } from '../_ui/search-bar/_type/search'

const postStrategies = async (page: number, size: number, searchTerms: SearchTermsModel) => {
  try {
    const response = await axiosInstance.post(
      `/api/strategies/search?page=${page}&size=${size}`,
      searchTerms
    )
    return response.data.result
  } catch (err) {
    console.error(err)
  }
}

export default postStrategies
