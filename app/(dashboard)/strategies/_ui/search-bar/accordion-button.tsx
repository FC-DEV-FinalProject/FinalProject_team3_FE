'use client'

import { useContext } from 'react'

import { CloseIcon, OpenIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import useSearchingItemStore from './_store/use-searching-item-store'
import { SearchTermsModel } from './_type/search'
import { AccordionContext } from './accordion-container'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  optionId: keyof SearchTermsModel
  title: string
  size?: number
}

const AccordionButton = ({ optionId, title, size }: Props) => {
  const { openIds, handleButtonIds } = useContext(AccordionContext)
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)

  const hasOpenId = openIds?.[optionId]
  const clickedValue = searchTerms[optionId]

  return (
    <div className={cx('accordion-button', { active: hasOpenId })}>
      <button onClick={() => handleButtonIds(optionId, !hasOpenId)}>
        <p>
          {title}
          {Array.isArray(clickedValue) &&
            clickedValue?.length !== 0 &&
            (clickedValue.length !== size ? (
              <span>
                ({clickedValue.length}/{size})
              </span>
            ) : (
              <span>(All)</span>
            ))}
        </p>
        {hasOpenId ? <CloseIcon /> : <OpenIcon />}
      </button>
    </div>
  )
}

export default AccordionButton
