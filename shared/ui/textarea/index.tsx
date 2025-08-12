'use client'

import { ComponentProps, forwardRef } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props extends ComponentProps<'textarea'> {
  rows?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ rows = 5, className, value, onChange, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        rows={rows}
        className={cx('textarea', className)}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
