import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)
const SideSkeleton = () => {
  return (
    <div className={cx('container')}>
      {Array.from({ length: 6 }, (_, idx) => (
        <div key={idx}></div>
      ))}
    </div>
  )
}

export default SideSkeleton
