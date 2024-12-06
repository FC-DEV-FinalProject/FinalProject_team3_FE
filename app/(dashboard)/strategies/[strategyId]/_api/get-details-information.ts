import axiosInstance from '@/shared/api/axios'

import { InformationType } from '../page'

const getDetailsInformation = async (strategyId: number) => {
  if (!strategyId) return

  try {
    const response = await axiosInstance.get(`/api/strategies/${strategyId}/detail`)
    const data = await response.data.result
    const detailsSideData: InformationType[] = [
      { title: '트레이더', data: data.nickname },
      { title: '최소 투자 금액', data: data.minimumInvestmentAmount },
      { title: '투자 원금', data: data.initialInvestment },

      [
        { title: 'KP Ratio', data: data.kpRatio },
        { title: 'SM SCORE', data: data.smScore },
      ],

      [
        { title: '최종손익입력일자', data: data.finalProfitLossDate },
        { title: '등록일', data: data.createdAt },
      ],
    ]
    const detailsInformationData = {
      ...data,
    }
    return { detailsSideData, detailsInformationData }
  } catch (err) {
    console.error(err)
  }
}

export default getDetailsInformation
