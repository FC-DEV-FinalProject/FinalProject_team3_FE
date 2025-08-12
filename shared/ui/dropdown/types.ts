import { CSSProperties, ReactNode } from 'react'

export interface DropdownOptionModel {
  value: string
  label: string
}

export type DropdownValueType = string | string[] | null

export type DropdownSizeType = 'small' | 'medium' | 'large'

export interface DropdownProps {
  size?: DropdownSizeType
  Trigger: ReactNode
  value: DropdownValueType
  onChange: (value: DropdownValueType) => void
  isMultiple?: boolean
  containerStyle?: CSSProperties
  labelStyle?: CSSProperties
  children?: ReactNode
}

export interface DropdownItemProps {
  size?: DropdownSizeType
  value: string
  label: string
  isSelected: boolean
  hasCheck?: boolean
  isMultiple?: boolean
  style?: CSSProperties
}

export interface DropdownStateModel {
  value: DropdownValueType
  onChange?: (value: DropdownValueType) => void
}
