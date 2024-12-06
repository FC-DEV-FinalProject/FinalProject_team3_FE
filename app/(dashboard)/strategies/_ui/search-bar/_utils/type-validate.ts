import { RangeModel } from '../_type/search'

export const isRangeModel = (value: unknown): value is RangeModel => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'min' in value &&
    'max' in value &&
    typeof (value as RangeModel).min === 'number' &&
    typeof (value as RangeModel).max === 'number'
  )
}
