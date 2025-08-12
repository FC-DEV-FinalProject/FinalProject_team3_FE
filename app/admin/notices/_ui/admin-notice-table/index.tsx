'use client'

import Link from 'next/link'

import AdminContentsHeader from '@/app/admin/_ui/admin-header'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'
import { calculateTableNumber } from '@/shared/utils/table'

import useAdminNotices from '../../_hook/query/get-admin-notices'
import useAdminNoticePage from '../../_hook/use-admin-notice-page'
import NoticeDeleteButton from '../button/notice-delete-button'
import NoticeEditButton from '../button/notice-edit-button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 10

const AdminNoticeTable = () => {
  const { currentPage, setCurrentPage } = useAdminNoticePage()
  const { data, isLoading } = useAdminNotices()

  if (isLoading || !data) {
    return <VerticalTable.Skeleton tableHead={['No.', '제목', '내용', '작성일', '']} />
  }

  const tableBody =
    data?.content.map((data, idx) => [
      calculateTableNumber({ page: currentPage, idx, countPerPage: COUNT_PER_PAGE }),
      <Link href={`/notices/${data.noticeId}/detail`} key={data.noticeId}>
        {data.title}
      </Link>,
      data.content.slice(0, 15),
      data.createdAt,
      <Button.ButtonGroup key={data.noticeId}>
        <NoticeEditButton noticeId={data.noticeId} />
        <NoticeDeleteButton noticeId={data.noticeId} />
      </Button.ButtonGroup>,
    ]) || []

  return (
    <>
      <AdminContentsHeader
        Left={
          <span>
            총 <span className={cx('colored')}>{data?.totalElements}</span>개
          </span>
        }
        className={cx('header')}
      />
      <VerticalTable
        tableHead={['No.', '제목', '내용', '작성일', '']}
        tableBody={tableBody}
        countPerPage={COUNT_PER_PAGE}
        currentPage={1}
      />
      <Pagination
        currentPage={currentPage}
        maxPage={data?.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

export default AdminNoticeTable
