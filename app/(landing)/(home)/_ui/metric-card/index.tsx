import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  count: number
  label: string
}

const MetricCard = ({ count, label }: Props) => {
  return (
    <div className={cx('container')}>
      <strong className={cx('count')}>{count.toLocaleString()}</strong>
      <p className={cx('label')}>{label}</p>
    </div>
  )
}

export default MetricCard
