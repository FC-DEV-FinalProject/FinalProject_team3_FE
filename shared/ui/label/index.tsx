import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type ColorType = 'orange' | 'indigo'

interface Props {
  color?: ColorType
  className?: string
  children: React.ReactNode
}

const Label = ({ color = 'indigo', className, children }: Props) => {
  return <span className={cx('label-container', color, className)}>{children}</span>
}

export default Label
