'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { SearchIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props extends ComponentPropsWithoutRef<'input'> {
  className?: string
  placeholder?: string
  onSearchIconClick?: () => void
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder = '', className, onSearchIconClick, value, onChange, ...props }: Props, ref) => {
    const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearchIconClick) {
        onSearchIconClick()
      }
    }

    return (
      <div className={cx('search-input-container', className)}>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => handleEnterSearch(e)}
          placeholder={placeholder}
          className={cx('search-input')}
          {...props}
        />
        <SearchIcon className={cx('search-icon')} onClick={onSearchIconClick} />
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
