import classNames from 'classnames/bind'

import styles from './loading.module.scss'

const cx = classNames.bind(styles)

const DetailsLoading = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('first-wrapper')}>
        <div className={cx('left')}>
          {Array.from({ length: 3 }, (_, idx) => (
            <div key={idx}></div>
          ))}
        </div>
        <div className={cx('right')}>
          {Array.from({ length: 3 }, (_, idx) => (
            <div key={idx}>
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('second-wrapper')}>
        <p>전략 상세 소개</p>
        <div></div>
      </div>
      <div className={cx('third-wrapper')}>
        {Array.from({ length: 5 }, (_, idx) => (
          <div key={idx}>
            <div></div>
            <div></div>
          </div>
        ))}
      </div>
      <div className={cx('fourth-wrapper')}>
        <p>분석</p>
        <div className={cx('chart')}></div>
        <div className={cx('tab')}>
          {Array.from({ length: 4 }, (_, idx) => (
            <div key={idx}></div>
          ))}
        </div>
        <div className={cx('analysis')}>
          {Array.from({ length: 4 }, (_, idx) => (
            <div key={idx}>
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailsLoading
