import { CSSProperties } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  label: string
  subtitle?: string
  marginLeft?: CSSProperties['marginLeft']
  className?: string
  style?: CSSProperties
}

const Title = ({ label, subtitle, marginLeft, className, style }: Props) => {
  return (
    <div className={cx('container', className)} style={{ ...style, marginLeft }}>
      <h1 className={cx('title')}>{label}</h1>
      {subtitle && <p className={cx('sub-title')}>{subtitle}</p>}
    </div>
  )
}

export default Title
