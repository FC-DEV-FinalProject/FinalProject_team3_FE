import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const StrategiesItemSkeleton = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('first')}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={cx('second')}>
        <div></div>
      </div>
      <div className={cx('last')}>
        <div></div>
      </div>
      <div className={cx('last')}>
        <div></div>
      </div>
    </div>
  )
}

export default StrategiesItemSkeleton
