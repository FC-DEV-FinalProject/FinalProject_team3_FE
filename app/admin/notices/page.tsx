'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'
import Title from '@/shared/ui/title'

import AdminContentsHeader from '../_ui/admin-header'
import NoticePostButton from './_ui/notice-post-button'
import styles from './page.module.scss'
import { RES } from './tabledata'

const cx = classNames.bind(styles)

const TOTAL_NOTICE = RES.data.content.length

const AdminNoticesPage = () => {
  return (
    <>
      <Title label="공지사항" style={{ margin: '80px 0 26px 12.6px' }} />
      <div className={cx('container')}>
        <NoticePostButton />
        <AdminContentsHeader
          Left={
            <span>
              총 <span className={cx('colored')}>{TOTAL_NOTICE}</span>개
            </span>
          }
          className={cx('header')}
        />
        <VerticalTable
          tableHead={['No.', '제목', '등록일', '작성일', '']}
          tableBody={RES.data.content.map((d, idx) => [
            idx + 1,
            d.title,
            d.publishedAt.slice(0, 10),
            d.createdAt.slice(0, 10),
            <Button.ButtonGroup key={d.content}>
              {/* TODO: onclick 로직 정의 */}

              <Button
                onClick={() => {}}
                size="small"
                className={cx('button')}
                style={{ padding: '16px 7px' }}
              >
                수정
              </Button>
              <Button
                size="small"
                onClick={() => {}}
                variant="filled"
                className={cx('button')}
                style={{ padding: '16px 7px' }}
              >
                삭제
              </Button>
            </Button.ButtonGroup>,
          ])}
          // TODO: 실제 값으로 추가
          countPerPage={10}
          currentPage={1}
        />
        {/* TODO: 실제 값으로 추가 */}
        <Pagination currentPage={1} maxPage={1} onPageChange={() => {}} />
      </div>
    </>
  )
}

export default AdminNoticesPage
