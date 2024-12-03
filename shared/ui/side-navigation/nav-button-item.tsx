'use client'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  icon: React.ElementType
  onClick: () => void
  children: React.ReactNode
}

const NavButtonItem = ({ icon: Icon, onClick, children }: Props) => {
  return (
    <li className={cx('navigation-item')}>
      <button type="button" onClick={onClick} className={cx('button')}>
        <Icon className={cx('icon')} />
        <span className={cx('text')}>{children}</span>
      </button>
    </li>
  )
}

export default NavButtonItem
