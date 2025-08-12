'use client'

import { usePathname } from 'next/navigation'

import { ChangeIcon, SignOutIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { useAuth } from '@/shared/hooks/custom/use-auth'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { isAdmin } from '@/shared/types/auth'
import NavButtonItem from '@/shared/ui/side-navigation/nav-button-item'
import NavLinkItem from '@/shared/ui/side-navigation/nav-link-item'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const UserNavigation = () => {
  const path = usePathname()
  const { user } = useAuthStore()
  const { logout } = useAuth()
  const isAdminPage = path.startsWith(PATH.ADMIN)

  if (!user) return null

  return (
    <nav className={cx('user-navigation')} aria-label="사용자 메뉴">
      <ul>
        <NavLinkItem href={PATH.PROFILE} imageUrl={user.imageUrl} textClassName="user">
          <span className={cx('nickname')}>{user.nickname}</span>
          <span className={cx('email')}>{user.email}</span>
        </NavLinkItem>

        {isAdmin(user) && (
          <NavLinkItem href={isAdminPage ? PATH.STRATEGIES : PATH.ADMIN_USERS} icon={ChangeIcon}>
            {isAdminPage ? '메인 대시보드' : '관리자 대시보드'}
          </NavLinkItem>
        )}

        <NavButtonItem icon={SignOutIcon} onClick={logout}>
          로그아웃
        </NavButtonItem>
      </ul>
    </nav>
  )
}

export default UserNavigation
