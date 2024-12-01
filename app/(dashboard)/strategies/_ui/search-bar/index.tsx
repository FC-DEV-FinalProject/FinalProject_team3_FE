'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/search-input'

import useSearchingItemStore from './_store/use-searching-item-store'
import { SearchTermsModel } from './_type/search'
import AccordionContainer from './accordion-container'
import AlgorithmItem from './algorithm-item'
import SearchBarTab from './search-bar-tab'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ALGORITHM_MENU = [
  { EFFICIENT_STRATEGY: '효율형 전략' },
  { ATTACK_STRATEGY: '공격형 전략' },
  { DEFENSIVE_STRATEGY: '방어형 전략' },
]
interface AccordionMenuDataModel {
  id: keyof SearchTermsModel
  title: string
  panels?: string[]
}
const SearchBarContainer = () => {
  const [isMainTab, setIsMainTab] = useState(true)
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const { setAlgorithm, resetState, validateRangeValues } = useSearchingItemStore(
    (state) => state.actions
  )

  const ACCORDION_MENU: AccordionMenuDataModel[] = [
    { id: 'tradeTypeNames', title: '매매 유형', panels: ['수동', '자동', '반자동'] },
    { id: 'operationCycles', title: '운용 주기', panels: ['데이', '포지션'] },
    { id: 'stockTypeNames', title: '운영 종목', panels: ['선물', '해외', '국내'] },
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
        <SearchInput placeholder="전략명을 검색하세요." />
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
          : ALGORITHM_MENU.map((menu) => {
              return Object.entries(menu).map(([key, value]) => (
                <AlgorithmItem
                  key={key}
                  name={value}
                  clickedAlgorithm={searchTerms.algorithmType}
                  onChange={setAlgorithm}
                />
              ))
            })}
        <div className={cx('search-button-wrapper')}>
          <Button className={cx('button', 'initialize')} onClick={resetState}>
            초기화
          </Button>
          <Button
            variant="filled"
            className={cx('button', 'searching')}
            onClick={validateRangeValues}
          >
            검색하기
          </Button>
        </div>
      </div>
    </>
  )
}

export default SearchBarContainer
