import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const SearchBarSkeleton = () => {
  return (
    <>
      <div className={cx('top')}></div>
      <div className={cx('container')}>
        {Array.from({ length: 7 }, (_, idx) => (
          <div key={idx}></div>
        ))}
      </div>
    </>
  )
}

export default SearchBarSkeleton
