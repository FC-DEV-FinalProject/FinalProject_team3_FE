import classNames from 'classnames/bind'

import styles from './layout.module.scss'

const cx = classNames.bind(styles)

interface Props {
  children: React.ReactNode
}

const StrategiesLayout = ({ children }: Props) => {
  return (
    <div className={cx('strategy-layout')}>
      <section className={cx('strategy')}>{children}</section>
    </div>
  )
}

export default StrategiesLayout
