import { MinimumInvestmentAmountType, OperationCycleType } from '../_api/add-strategy'

const INVESTMENT_AMOUNT_MAP: Record<MinimumInvestmentAmountType, string> = {
  UNDER_10K: '1만원 ~ 500만원',
  UP_TO_500K: '500만원',
  UP_TO_1M: '1000만원',
  UP_TO_2M: '2000만원',
  UP_TO_5M: '5000만원',
  FROM_5M_TO_10M: '5000만원 ~ 1억',
  FROM_10M_TO_20M: '1억 ~ 2억',
  FROM_20M_TO_30M: '2억 ~ 3억',
  FROM_30M_TO_40M: '3억 ~ 4억',
  FROM_40M_TO_50M: '4억 ~ 5억',
  FROM_50M_TO_100M: '5억 ~ 10억',
  ABOVE_100M: '10억 이상',
}

const OPERATION_CYCLE_MAP: Record<OperationCycleType, string> = {
  DAY: '데이',
  POSITION: '포지션',
}

export const minimumInvestmentAmountOptions = Object.entries(INVESTMENT_AMOUNT_MAP).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export const operationCycleOptions = Object.entries(OPERATION_CYCLE_MAP).map(([value, label]) => ({
  value,
  label,
}))
