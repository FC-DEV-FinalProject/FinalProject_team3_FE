'use client'

import Link from 'next/link'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

import useGetNotices from '../../_hooks/use-notice'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 7

export interface NoticeListContentModel {
  no: number
  title: React.ReactNode
  createdAt: string
}

const NoticeTable = () => {
  const { page, handlePageChange } = usePagination({
    basePath: PATH.NOTICES,
    pageSize: COUNT_PER_PAGE,
  })

  const { data, isLoading } = useGetNotices({
    page,
    size: COUNT_PER_PAGE,
  })

  if (!data || isLoading) {
    return null
  }

  const notices = data.content.map((values, idx) => ({
    no: (page - 1) * COUNT_PER_PAGE + (idx + 1),
    title: <Link href={`${PATH.NOTICES}/${values.noticeId}/detail`}>{values.title}</Link>,
    createdAt: values.createdAt,
  }))

  return (
    <div className={cx('table-wrapper')}>
      <p className={cx('count')}>
        총 <span className={cx('highlight')}>{data.totalElements}</span>개
      </p>
      <VerticalTable
        className={cx('table')}
        countPerPage={COUNT_PER_PAGE}
        currentPage={page}
        tableBody={notices}
        tableHead={['No.', '제목', '등록일']}
      />
      <Pagination currentPage={page} maxPage={data.totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default NoticeTable
