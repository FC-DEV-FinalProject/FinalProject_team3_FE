'use client'

import classNames from 'classnames/bind'

import Pagination from '@/shared/ui/pagination'
import { SearchInput } from '@/shared/ui/search-input'
import Select from '@/shared/ui/select'
import VerticalTable from '@/shared/ui/table/vertical'
import Tabs from '@/shared/ui/tabs'
import Title from '@/shared/ui/title'

import AdminContentsHeader from '../_ui/admin-header'
import setTableBody from './_api/set-table-body'
import useAdminUsers from './_hooks/query/use-admin-users'
import useUserSearch from './_hooks/use-user-search-page'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const AdminUsersPage = () => {
  const {
    searchOptions,
    tabs,
    select,
    setSelect,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    keyword,
    condition,
    setConditionAndKeyword,
  } = useUserSearch()

  const { isLoading, data } = useAdminUsers({ role: activeTab, condition, keyword })

  if (isLoading || !data) return null

  return (
    <>
      <Title label="회원 관리" className={cx('title')} />
      <section className={cx('container')}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminContentsHeader
          Left={
            <span>
              총 <span className={cx('color-primary-500')}>{data?.totalElements}</span>명
            </span>
          }
          Right={
            <div style={{ display: 'flex', gap: '24px' }}>
              <Select
                size="small"
                options={searchOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                value={select}
                onChange={(v) => {
                  setSelect(v as string)
                }}
              />
              <SearchInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearchIconClick={setConditionAndKeyword}
              />
            </div>
          }
        />
        <VerticalTable
          tableHead={['No.', '프로필', '이름', '닉네임', '이메일', '전화번호', '회원분류', '탈퇴']}
          tableBody={setTableBody(data?.content)}
          countPerPage={10}
          currentPage={1}
        />
        <Pagination currentPage={data?.page} maxPage={data?.totalPages} onPageChange={() => {}} />
      </section>
    </>
  )
}

export default AdminUsersPage
