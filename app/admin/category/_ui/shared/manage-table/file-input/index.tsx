'use client'

import { ComponentPropsWithoutRef } from 'react'

import { FileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props extends ComponentPropsWithoutRef<'input'> {
  placeholder?: string
  onSearchIconClick?: () => void
}

const FileInput = ({ placeholder = '', value, onChange, ...props }: Props) => {
  return (
    <div className={cx('search-input-container')}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cx('search-input')}
        {...props}
      />
      <FileIcon className={cx('search-icon')} />
    </div>
  )
}

export default FileInput
