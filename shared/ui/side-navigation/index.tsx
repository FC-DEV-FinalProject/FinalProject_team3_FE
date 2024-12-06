import classNames from 'classnames/bind'

import NavHeader from '@/shared/ui/side-navigation/nav-header'
import UserNavigation from '@/shared/ui/side-navigation/user-navigation'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  children: React.ReactNode
}

const SideNavigation = ({ children }: Props) => {
  return (
    <aside className={cx('aside')}>
      <NavHeader />

      <nav className={cx('main-navigation')} aria-label="메인 메뉴">
        <ul>{children}</ul>
      </nav>

      <UserNavigation />
    </aside>
  )
}

export default SideNavigation
