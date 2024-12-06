'use client'

import { ComponentProps, ReactNode } from 'react'

import classNames from 'classnames/bind'

import styles from './button.module.scss'

const cx = classNames.bind(styles)

export type ButtonSizeType = 'small' | 'medium' | 'large'
export type ButtonVariantType = 'outline' | 'filled'

interface Props extends ComponentProps<'button'> {
  size?: ButtonSizeType
  variant?: ButtonVariantType
  onClick?: () => void
}

const _Button = ({
  children,
  size = 'medium',
  variant = 'outline',
  disabled = false,
  onClick,
  className,
  ...props
}: Props) => (
  <button
    className={cx('button', size, variant, { disabled }, className)}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

interface ButtonGroupProps {
  gap?: string
  children: ReactNode
}

const ButtonGroup = ({ gap = '8px', children }: ButtonGroupProps) => {
  return <div style={{ display: 'flex', gap }}>{children}</div>
}

_Button.ButtonGroup = ButtonGroup

export { _Button as Button }
