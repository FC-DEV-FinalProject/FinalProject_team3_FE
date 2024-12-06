'use client'

import classNames from 'classnames/bind'

import Spinner from '@/shared/ui/spinner'

import styles from './loading.module.scss'

const cx = classNames.bind(styles)

const LoadingPage = () => {
  return (
    <div className={cx('container')}>
      <p>Loading...</p>
      <Spinner />
    </div>
  )
}

export default LoadingPage
