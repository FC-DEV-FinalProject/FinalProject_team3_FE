import { CSSProperties, ElementType, ReactNode } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  Left?: ReactNode
  Right?: ReactNode
  as?: ElementType
  styles?: CSSProperties
}

const Header = ({ Left, Right, as: Component = 'header', styles }: Props) => {
  return (
    <Component className={cx('container')} style={styles}>
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
    </Component>
  )
}

export default Header
