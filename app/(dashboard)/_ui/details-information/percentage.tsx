import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  percent: number
  label: string
}

const Percentage = ({ percent, label }: Props) => {
  const isMinus = percent < 0

  return (
    <div className={cx('percentage-wrapper')}>
      <p className={cx('percent', isMinus && 'minus')}>
        {percent.toFixed(2)}
        {label !== 'Profit Factor' && '%'}
      </p>
      <p className={cx('label')}>{label}</p>
    </div>
  )
}

export default Percentage
