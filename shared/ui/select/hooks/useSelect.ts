import { DropdownOptionModel, DropdownValueType } from '../../dropdown/types'

export const useSelect = () => {
  const isSelected = (value: DropdownValueType, itemValue: string) => {
    if (Array.isArray(value)) return value.includes(itemValue)
    return value === itemValue
  }

  const findLabel = (options: DropdownOptionModel[], value: DropdownValueType) => {
    if (Array.isArray(value)) return
    return options.find((option) => option.value === value)?.label
  }
  return { isSelected, findLabel }
}
