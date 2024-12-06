'use client'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  className?: string
}

const Spinner = ({ className }: Props) => {
  return (
    <div className={cx('container')}>
      <div className={cx('spinner', className)} />
    </div>
  )
}

export default Spinner
