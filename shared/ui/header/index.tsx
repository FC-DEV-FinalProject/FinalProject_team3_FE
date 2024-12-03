import { CSSProperties, ReactNode } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  Left?: ReactNode
  Right?: ReactNode
  styles?: CSSProperties
}

const Header = ({ Left, Right, styles }: Props) => {
  return (
    <header className={cx('container')} style={styles}>
      {Left}
      {Right && (
        <>
          <div className={cx('right-wrapper')}>
            <input type="checkbox" id="menu-trigger" />
            <label htmlFor="menu-trigger">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <div className={cx('right-contents-wrapper')}>{Right}</div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
