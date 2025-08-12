import classNames from 'classnames/bind'

import Title from '@/shared/ui/title'

import AdminNoticeTable from './_ui/admin-notice-table'
import NoticePostButton from './_ui/notice-post-button'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const AdminNoticesPage = () => {
  return (
    <>
      <Title label="공지사항" style={{ margin: '80px 0 26px 12.6px' }} />
      <div className={cx('container')}>
        <NoticePostButton />
        <AdminNoticeTable />
      </div>
    </>
  )
}

export default AdminNoticesPage
