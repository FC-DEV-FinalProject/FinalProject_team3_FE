'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/search-input'

import useGetStrategiesSearch from '../../_hooks/query/use-get-strategies-search'
import usePostStrategies from '../../_hooks/query/use-post-strategies'
import useSearchingItemStore from './_store/use-searching-item-store'
import { AlgorithmItemType, SearchTermsModel } from './_type/search'
import AccordionContainer from './accordion-container'
import AlgorithmItem from './algorithm-item'
import SearchBarTab from './search-bar-tab'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface AccordionMenuDataModel {
  id: keyof SearchTermsModel
  title: string
  panels?: string[]
}

const SearchBarContainer = () => {
  const [isMainTab, setIsMainTab] = useState(true)
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const errOptions = useSearchingItemStore((state) => state.errOptions)
  const { setSearchWord, setAlgorithm, resetState, validateRangeValues } = useSearchingItemStore(
    (state) => state.actions
  )
  const searchRef = useRef<HTMLInputElement>(null)
  const { data } = useGetStrategiesSearch()
  const { refetch } = usePostStrategies({ page: 1, size: 8, searchTerms })

  const handleSearchWord = () => {
    if (searchRef.current) {
      setSearchWord(searchRef.current.value)
    }
  }

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const onReset = async () => {
    await resetState()
    if (searchRef.current) {
      searchRef.current.value = ''
    }
    refetch()
  }

  const onSearch = async () => {
    await validateRangeValues()
    if (errOptions === null || errOptions.length === 0) {
      refetch()
    }
  }

  const ALGORITHM_MENU = [
    { id: 'EFFICIENT_STRATEGY', name: '효율형 전략' },
    { id: 'ATTACK_STRATEGY', name: '공격형 전략' },
    { id: 'DEFENSIVE_STRATEGY', name: '방어형 전략' },
  ]

  const ACCORDION_MENU: AccordionMenuDataModel[] = [
    { id: 'tradeTypeNames', title: '매매 유형', panels: data?.tradeTypeNames },
    { id: 'operationCycles', title: '운용 주기', panels: ['데이', '포지션'] },
    { id: 'stockTypeNames', title: '운영 종목', panels: data?.stockTypeNames },
    { id: 'durations', title: '기간', panels: ['1년 이하', '1년 ~ 2년', '2년 ~ 3년', '3년 이상'] },
    {
      id: 'profitRanges',
      title: '수익률',
      panels: ['10% 이하', '10% ~ 20%', '20% ~ 30%', '30% 이상'],
    },
    { id: 'principalRange', title: '원금' },
    { id: 'mddRange', title: 'MDD' },
    { id: 'smScoreRange', title: 'SM SCORE' },
  ]

  return (
    <>
      <div className={cx('searchInput-wrapper')}>
        <SearchInput
          ref={searchRef}
          placeholder="전략명을 검색하세요."
          onChange={handleSearchWord}
          onKeyDown={(e) => handleEnterSearch(e)}
          onSearchIconClick={onSearch}
        />
      </div>
      <div className={cx('searchInput-wrapper')}>
        <SearchBarTab isMainTab={isMainTab} onChangeTab={setIsMainTab} />
        {isMainTab
          ? ACCORDION_MENU.map((menu) => (
              <AccordionContainer
                key={menu.id}
                optionId={menu.id}
                title={menu.title}
                panels={menu.panels}
              />
            ))
          : ALGORITHM_MENU.map((menu) => (
              <AlgorithmItem
                key={menu.id}
                optionId={menu.id as AlgorithmItemType}
                name={menu.name}
                clickedAlgorithm={searchTerms.algorithmType}
                onChange={setAlgorithm}
              />
            ))}
        <div className={cx('search-button-wrapper')}>
          <Button className={cx('button', 'initialize')} onClick={onReset}>
            초기화
          </Button>
          <Button variant="filled" className={cx('button', 'searching')} onClick={onSearch}>
            검색하기
          </Button>
        </div>
      </div>
    </>
  )
}

export default SearchBarContainer
