import { ComponentProps } from 'react'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import classNames from 'classnames/bind'

import { ButtonSizeType, ButtonVariantType } from '../button'
import styles from './link-button.module.scss'

const cx = classNames.bind(styles)

interface Props extends Omit<ComponentProps<typeof Link>, 'href'> {
  size?: ButtonSizeType
  variant?: ButtonVariantType
  href: Url
}

export const LinkButton = ({
  children,
  size = 'medium',
  variant = 'outline',
  className,
  href,
  ...props
}: Props) => (
  <Link href={href} className={cx('button', size, variant, className)} {...props}>
    {children}
  </Link>
)
