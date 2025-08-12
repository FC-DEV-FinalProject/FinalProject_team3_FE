import axiosInstance from '@/shared/api/axios'

interface StrategyDetailsResponseModel {
  isSuccess: boolean
  message: string
  result: {
    strategyName: string
    tradeType: {
      tradeTypeId: number
      tradeTypeName: string
      tradeTypeIconUrl: string
    }
    stockTypes: Array<{
      stockTypeId: number
      stockTypeName: string
      stockIconUrl: string
    }>
    minimumInvestmentAmount: string
    operationCycle: string
    proposalFileName: string
    proposalFileUrl: string
    isPublic: boolean
    description: string
  }
}

const getProposalFileName = async (strategyId: number) => {
  const response = await axiosInstance.get<StrategyDetailsResponseModel>(
    `/api/my-strategies/modify/${strategyId}`
  )
  return response.data
}

export default getProposalFileName
