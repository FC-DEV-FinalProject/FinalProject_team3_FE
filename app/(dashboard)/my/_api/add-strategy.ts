import axiosInstance from '@/shared/api/axios'

export interface StockTypeModel {
  stockTypeId: number
  stockTypeName: string
  stockIconUrl: string
}

export interface TradeTypeModel {
  tradeTypeId: number
  tradeTypeName: string
  tradeTypeIconUrl: string
}

export interface StrategyTypeResponseModel {
  isSuccess: boolean
  message: string
  result: {
    stockTypes: StockTypeModel[]
    tradeTypes: TradeTypeModel[]
  }
}

export type OperationCycleType = 'DAY' | 'POSITION'

export type MinimumInvestmentAmountType =
  | 'UNDER_10K'
  | 'UP_TO_500K'
  | 'UP_TO_1M'
  | 'UP_TO_2M'
  | 'UP_TO_5M'
  | 'FROM_5M_TO_10M'
  | 'FROM_10M_TO_20M'
  | 'FROM_20M_TO_30M'
  | 'FROM_30M_TO_40M'
  | 'FROM_40M_TO_50M'
  | 'FROM_50M_TO_100M'
  | 'ABOVE_100M'

export interface ProposalFileInfoModel {
  proposalFileName: string
  proposalFileSize: number
}

export interface StrategyModel {
  strategyName: string
  tradeTypeId: number
  operationCycle: OperationCycleType
  stockTypeIds: number[]
  minimumInvestmentAmount: MinimumInvestmentAmountType
  description: string
  proposalFile: ProposalFileInfoModel | null
}

export interface StrategyResponseModel {
  isSuccess: boolean
  message: string
  result: {
    strategyId: number
    presignedUrl?: string
  }
  code: number
}

export const strategyApi = {
  getStrategyTypes: () =>
    axiosInstance.get<StrategyTypeResponseModel>('/api/my-strategies/register'),

  registerStrategy: (data: StrategyModel) =>
    axiosInstance.post<StrategyResponseModel>('/api/my-strategies/register', data),
}
