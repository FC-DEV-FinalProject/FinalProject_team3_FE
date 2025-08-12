'use client'

import classNames from 'classnames/bind'

import useSearchingItemStore from './_store/use-searching-item-store'
import { RangeModel, SearchTermsModel } from './_type/search'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  optionId: keyof SearchTermsModel
}

const RangeContainer = ({ optionId }: Props) => {
  const errOptions = useSearchingItemStore((state) => state.errOptions)
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const { setRangeValue } = useSearchingItemStore((state) => state.actions)
  const option = searchTerms?.[optionId] as RangeModel | null

  const handleRangeValue = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value === '' ? null : Number(e.target.value)
    setRangeValue(optionId, type, value ?? 0)
  }

  const getDisplayValue = (value: number | null | undefined): string =>
    value === null || value === undefined ? '' : String(value)

  return (
    <div className={cx('range-container')}>
      <div className={cx('range-wrapper')}>
        <input
          className={cx('range')}
          value={getDisplayValue(option?.min)}
          type="number"
          placeholder="0"
          onChange={(e) => handleRangeValue(e, 'min')}
        />
        <span>~</span>
        <input
          className={cx('range')}
          value={getDisplayValue(option?.max)}
          type="number"
          placeholder="0"
          onChange={(e) => handleRangeValue(e, 'max')}
        />
      </div>
      {errOptions?.includes(optionId) && <p>최소 값은 최대 값보다 작아야합니다.</p>}
    </div>
  )
}

export default RangeContainer
