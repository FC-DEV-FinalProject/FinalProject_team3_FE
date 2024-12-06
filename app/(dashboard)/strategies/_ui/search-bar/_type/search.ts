export type AlgorithmItemType = 'EFFICIENT_STRATEGY' | 'ATTACK_STRATEGY' | 'DEFENSIVE_STRATE'

export interface SearchTermsModel {
  searchWord: string | null
  tradeTypeNames: string[] | null
  operationCycles: string[] | null
  stockTypeNames: string[] | null
  durations: string[] | null
  profitRanges: string[] | null
  principalRange: RangeModel | null
  mddRange: RangeModel | null
  smScoreRange: RangeModel | null
  algorithmType: AlgorithmItemType | null
}

export interface RangeModel {
  min: number
  max: number
}
