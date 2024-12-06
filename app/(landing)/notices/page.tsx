'use client'

import classNames from 'classnames/bind'

import NoticeTable from './_ui/notice-table'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const NoticePage = () => {
  return (
    <>
      <h1 className={cx('title')}>공지사항</h1>
      <NoticeTable />
    </>
  )
}

export default NoticePage
