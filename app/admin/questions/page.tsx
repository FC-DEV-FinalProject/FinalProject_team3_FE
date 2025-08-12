'use client'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { QuestionSearchConditionType } from '@/shared/types/questions'
import Pagination from '@/shared/ui/pagination'
import SearchInput from '@/shared/ui/search-input'
import Select from '@/shared/ui/select'
import VerticalTable from '@/shared/ui/table/vertical'
import Tabs from '@/shared/ui/tabs'
import Title from '@/shared/ui/title'

import AdminContentsHeader from '../_ui/admin-header'
import setAdminQuestionTableBody from './_api/set-admin-question-table-body'
import useAdminQuestions from './_hooks/query/use-admin-questions'
import useAdminQuestionsPage from './_hooks/use-admin-questions-page'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const AdminQuestionsPage = () => {
  const {
    searchConditions,
    tabs,
    activeTab,
    keyword,
    setKeyword,
    searchCondition,
    setSearchCondition,
    stateCondition,
    setConditionAndKeyword,
    searchParams,
    onTabChange,
  } = useAdminQuestionsPage()

  const { isLoading, data, refetch } = useAdminQuestions({
    ...searchParams,
    stateCondition,
  })

  const { page, handlePageChange } = usePagination({
    basePath: PATH.ADMIN_QUESTIONS,
    pageSize: data?.size || 10,
  })

  if (isLoading || !data) return null

  return (
    <>
      <Title label="문의 내역" className={cx('title')} />
      <section className={cx('container')}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        <AdminContentsHeader
          Left={
            <span>
              총 <span className={cx('color-primary-500')}>{data?.totalElements}</span>개
            </span>
          }
          Right={
            <div className={cx('condition-search')}>
              <Select
                size="small"
                options={searchConditions.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                value={searchCondition}
                onChange={(v) => {
                  setSearchCondition(v as QuestionSearchConditionType)
                }}
              />
              <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onSearchIconClick={() => {
                  setConditionAndKeyword()
                  refetch()
                }}
              />
            </div>
          }
        />
        <VerticalTable
          tableHead={['No.', '제목', '전략명', '트레이더', '질문자', '상태', '']}
          tableBody={setAdminQuestionTableBody({
            data: data.content,
            page: data.page,
            countPerPage: data.size,
          })}
          countPerPage={data.size}
          currentPage={1}
        />
        {data.content.length > 0 && (
          <Pagination
            currentPage={page}
            maxPage={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  )
}

export default AdminQuestionsPage
