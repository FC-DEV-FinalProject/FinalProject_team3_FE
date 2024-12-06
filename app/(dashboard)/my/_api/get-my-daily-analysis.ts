import axiosInstance from '@/shared/api/axios'

const getMyDailyAnalysis = async (strategyId: number, page: number, size: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/my-strategies/${strategyId}/daily-analysis?page=${page}&size=${size}`
    )
    return response.data.result
  } catch (err) {
    console.error(err, `일간 분석 조회 실패`)
  }
}

export default getMyDailyAnalysis
