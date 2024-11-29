'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import classNames from 'classnames/bind'

import { ErrorMessage } from '../error-message'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type InputSizeType = 'small' | 'compact' | 'medium' | 'large' | 'full'

interface Props extends ComponentPropsWithoutRef<'input'> {
  inputSize?: InputSizeType
  errorMessage?: string | null
  isWhiteDisabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      inputSize = 'medium',
      className,
      value,
      errorMessage,
      isWhiteDisabled = false,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          className={cx(
            'input',
            inputSize,
            { error: !!errorMessage, 'white-disabled': isWhiteDisabled },
            className
          )}
          {...props}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    )
  }
)

Input.displayName = 'Input'
