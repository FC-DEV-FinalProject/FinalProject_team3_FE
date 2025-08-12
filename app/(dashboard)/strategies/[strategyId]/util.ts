import {
  DailyAnalysisModel,
  MonthlyAnalysisModel,
  MyDailyAnalysisModel,
} from '@/shared/types/strategy-data'
import { TableBodyDataType } from '@/shared/ui/table/vertical'

type AnalysisModelType = DailyAnalysisModel | MyDailyAnalysisModel | MonthlyAnalysisModel
type RateKeysType<ObjectType> = keyof {
  [Key in keyof ObjectType as Key extends `${string}Rate` ? Key : never]: ObjectType[Key]
}

export const generateFormattedStrategyData = (data: AnalysisModelType[]): TableBodyDataType[] => {
  if (!data || data.length === 0) return []

  return data.map((item) => {
    const transformedItem = { ...item }

    const hasRateKey = Object.keys(transformedItem).some((key) => key.endsWith('Rate'))
    if (!hasRateKey) return transformedItem

    type RatePropsType = RateKeysType<AnalysisModelType>

    Object.keys(transformedItem).forEach((key) => {
      if (key.endsWith('Rate')) {
        const value = (transformedItem as AnalysisModelType)[key as keyof AnalysisModelType]

        if (value !== null && typeof value === 'number') {
          transformedItem[key as RatePropsType] = `${(value * 100).toFixed(2)}%`
        }
      }
    })

    return transformedItem
  })
}
