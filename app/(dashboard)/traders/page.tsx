'use client'

import { useRef, useState } from 'react'

import styles from '@/app/(dashboard)/traders/page.module.scss'
import { COUNT_PER_PAGE } from '@/app/admin/category/_ui/shared/manage-table/constant'
import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { DropdownValueType } from '@/shared/ui/dropdown/types'
import Pagination from '@/shared/ui/pagination'
import { SearchInput } from '@/shared/ui/search-input'
import Select from '@/shared/ui/select'
import Title from '@/shared/ui/title'
import TradersListCard from '@/shared/ui/traders-list-card'

import useGetTraders from './_hooks/use-get-traders'

const cx = classNames.bind(styles)

const TradersPage = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownValueType>('STRATEGY_TOTAL')
  const [searchKeyword, setSearchKeyword] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { page, handlePageChange } = usePagination({
    basePath: PATH.TRADERS,
    pageSize: COUNT_PER_PAGE,
  })

  const { data } = useGetTraders({
    page,
    size: 12,
    keyword: searchKeyword,
    orderBy: selectedOption as 'STRATEGY_TOTAL' | 'SUBSCRIBE_TOTAL',
  })

  const handleSearch = () => {
    if (searchInputRef.current) {
      setSearchKeyword(searchInputRef.current.value || '')
      handlePageChange(1)
    }
  }

  const traders = data?.content

  if (!traders) {
    return null
  }

  return (
    <>
      <div className={cx('page-container')}>
        <div className={cx('title')}>
          <Title label={'트레이더 목록'} marginLeft={'13px'}></Title>
        </div>
        <div className={cx('search-wrapper')}>
          <Select
            size="small"
            value={selectedOption}
            placeholder="구독순"
            onChange={setSelectedOption}
            options={[
              { value: 'STRATEGY_TOTAL', label: '전략순' },
              { value: 'SUBSCRIBE_TOTAL', label: '구독순' },
            ]}
          ></Select>
          <SearchInput ref={searchInputRef} onSearchIconClick={handleSearch} />
        </div>
        <div className={cx('traders-list-wrapper')}>
          {traders.map((trader) => (
            <TradersListCard
              key={trader.userId}
              imageUrl={trader.imageUrl}
              nickname={trader.nickname}
              strategyCount={trader.strategyCount}
              subscriberCount={trader.totalSubCount}
              userId={trader.userId}
            />
          ))}
        </div>

        <div className={cx('pagination-wrapper')}>
          {data.totalElements > 0 && (
            <Pagination
              currentPage={page}
              maxPage={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TradersPage
