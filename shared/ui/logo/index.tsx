import Link from 'next/link'

import { ImageLogo, TextLogo } from '@/public/images'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  href?: string
  hasText?: boolean
  className?: string
}

const Logo = ({ href = PATH.HOME, hasText = false, className }: Props) => {
  return (
    <Link href={href} className={cx('container', className)}>
      <ImageLogo />
      {hasText && <TextLogo className={cx('text')} aria-label="인베스트메틱" />}
    </Link>
  )
}

export default Logo
