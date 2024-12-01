import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  message: string
  children?: string
}

export const Confirmation = ({ title, message, children }: Props) => {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('line')}></div>
      <p className={cx('message')}>{message}</p>
      {children}
    </div>
  )
}
