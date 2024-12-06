import Link from 'next/link'

import Logo from '@/public/images/logo.svg'
import TextLogo from '@/public/images/text-logo.svg'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NavHeader = () => {
  return (
    <header>
      <h1>
        <Link href={PATH.HOME} className={cx('logo')}>
          <Logo />
          <TextLogo className={cx('text')} aria-label="인베스트메틱" />
        </Link>
      </h1>
    </header>
  )
}

export default NavHeader
