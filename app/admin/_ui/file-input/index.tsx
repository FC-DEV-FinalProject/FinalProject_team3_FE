'use client'

import { ComponentPropsWithoutRef } from 'react'

import Image from 'next/image'

import { FileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props extends ComponentPropsWithoutRef<'input'> {
  accept?: string
  preview?: string
  multiple?: boolean
  className?: string
}

const FileInput = ({
  preview,
  accept = '*',
  value,
  onChange,
  multiple = false,
  className,
  ...props
}: Props) => {
  return (
    <div className={cx('container', className)}>
      {preview && (
        <Image width={24} height={24} src={preview} alt="Preview" className={cx('preview')} />
      )}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className={cx('input')}
        {...props}
      />
      <FileIcon className={cx('icon')} />
    </div>
  )
}

export default FileInput
