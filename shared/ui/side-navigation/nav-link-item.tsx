'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'

import Avatar from '../avatar'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  href: string
  icon?: React.ElementType
  children: React.ReactNode
  textClassName?: keyof typeof styles
  imageUrl?: string
}

const NavLinkItem = ({ href, icon: Icon, textClassName, children, imageUrl }: Props) => {
  const path = usePathname()
  const isActive = path.startsWith(href) && href !== PATH.PROFILE

  return (
    <li className={cx('navigation-item')}>
      <Link href={href} className={cx('link', isActive && 'active')}>
        {Icon ? (
          <Icon className={cx('icon')} />
        ) : (
          <Avatar size="medium" src={imageUrl} avatarStyle={{ marginLeft: '-4px' }} />
        )}
        <span className={cx('text', textClassName)}>{children}</span>
      </Link>
    </li>
  )
}

export default NavLinkItem
