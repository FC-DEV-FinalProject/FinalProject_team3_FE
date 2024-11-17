'use client'

import { ComponentProps } from 'react'

import { SearchIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props extends ComponentProps<'input'> {
  placeholder?: string
  handleSearchIconClick?: () => void
}

export const SearchInput = ({ placeholder = '', handleSearchIconClick, ...props }: Props) => {
  return (
    <div className={cx('search-input-container')}>
      <input placeholder={placeholder} className={cx('search-input')} {...props} />
      <SearchIcon className={cx('search-icon')} onClick={handleSearchIconClick} />
    </div>
  )
}