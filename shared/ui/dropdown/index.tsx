'use client'

import { createContext } from 'react'

import { CheckboxIcon, CloseIcon, OpenIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { useDropdown } from './hooks/use-dropdown'
import { useDropdownContext } from './hooks/use-dropdown-context'
import RangeOption from './option/range-option'
import styles from './styles.module.scss'
import { DropdownItemProps, DropdownProps } from './types'

const cx = classNames.bind(styles)

interface DropdownContextProps {
  isOpen: boolean
  toggleOpen: () => void
  handleSelect: (value: string) => void
}

const defaultContext = {
  isOpen: false,
  toggleOpen: () => {},
  selectedValues: [],
  handleSelect: () => {},
}

export const DropdownContext = createContext<DropdownContextProps>(defaultContext)

const Dropdown = ({
  size = 'small',
  Trigger,
  value,
  onChange,
  isMultiple = false,
  containerStyle,
  labelStyle,
  children,
}: DropdownProps) => {
  const { isOpen, toggleOpen, handleSelect, dropdownRef } = useDropdown({
    value,
    onChange,
    isMultiple,
  })

  return (
    <DropdownContext.Provider value={{ isOpen, toggleOpen, handleSelect }}>
      <div className={cx('dropdown', `dropdown-${size}`)} style={containerStyle} ref={dropdownRef}>
        <button
          onClick={toggleOpen}
          className={cx('container', 'trigger', size, { open: isOpen })}
          style={labelStyle}
          type="button"
        >
          {Trigger}
          {isOpen ? <CloseIcon /> : <OpenIcon />}
        </button>
        {isOpen && <ul className={cx('options', size)}>{children}</ul>}
      </div>
    </DropdownContext.Provider>
  )
}

const Item = ({
  isSelected,
  value,
  label,
  hasCheck = false,
  size = 'small',
  style,
}: DropdownItemProps) => {
  const context = useDropdownContext()

  const { handleSelect } = context

  return (
    <li
      className={cx('container', 'option', size, { selected: isSelected })}
      style={style}
      onClick={() => handleSelect(value)}
      aria-hidden
    >
      {label}
      {hasCheck && <CheckboxIcon className={cx({ 'selected-icon': isSelected })} />}
    </li>
  )
}

export default Object.assign(Dropdown, { Item, RangeOption })
