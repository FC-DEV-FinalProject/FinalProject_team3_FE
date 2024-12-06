'use client'

import { CSSProperties } from 'react'

import Dropdown from '../dropdown'
import {
  DropdownItemProps,
  DropdownOptionModel,
  DropdownProps,
  DropdownValueType,
} from '../dropdown/types'
import { useSelect } from './hooks/useSelect'

export type SelectType = Pick<
  DropdownProps,
  'size' | 'isMultiple' | 'containerStyle' | 'labelStyle'
> &
  Pick<DropdownItemProps, 'hasCheck'> & {
    placeholder?: string
    value: DropdownValueType
    onChange: (value: DropdownValueType) => void
    titleStyle?: CSSProperties
    options: DropdownOptionModel[]
  }

const Select = ({
  size,
  isMultiple = false,
  hasCheck = false,
  containerStyle,
  titleStyle,
  placeholder,
  value,
  onChange,
  options,
}: SelectType) => {
  const { isSelected, findLabel } = useSelect()

  if (!options.length) return null

  return (
    <Dropdown
      size={size}
      Trigger={<span>{findLabel(options, value) ?? placeholder ?? options[0].label}</span>}
      isMultiple={isMultiple}
      value={value}
      onChange={onChange}
      containerStyle={containerStyle}
      labelStyle={titleStyle}
    >
      {options.map(({ value: itemValue, label }) => (
        <Dropdown.Item
          value={itemValue}
          label={label}
          isSelected={isSelected(value, itemValue)}
          isMultiple={isMultiple}
          hasCheck={hasCheck}
          key={label}
        />
      ))}
    </Dropdown>
  )
}

export default Select
