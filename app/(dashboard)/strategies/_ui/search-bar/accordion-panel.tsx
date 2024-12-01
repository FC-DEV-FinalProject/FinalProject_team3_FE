'use client'

import { useContext, useEffect, useState } from 'react'

import { CheckedCircleIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import useSearchingItemStore from './_store/use-searching-item-store'
import { SearchTermsModel } from './_type/search'
import { AccordionContext } from './accordion-container'
import RangeContainer from './range-container'
import styles from './styles.module.scss'

/* eslint-disable react-hooks/exhaustive-deps */

const cx = classNames.bind(styles)

interface Props {
  optionId: keyof SearchTermsModel
  panels?: string[]
}

const AccordionPanel = ({ optionId, panels }: Props) => {
  const { openIds, panelRef } = useContext(AccordionContext)
  const [panelHeight, setPanelHeight] = useState<number | null>(null)
  const [isClose, setIsClose] = useState(false)
  const searchTerms = useSearchingItemStore((state) => state.searchTerms)
  const { setPanelItem } = useSearchingItemStore((state) => state.actions)

  useEffect(() => {
    if (panelRef.current && hasOpenId) {
      const panelHeight = panelRef.current.clientHeight + 32 * (panels?.length || 1)
      setPanelHeight(panelHeight)
      panelRef.current.style.setProperty('--panel-height', `${panelHeight}px`)
    }

    if (!hasOpenId) {
      setIsClose(true)
      const timeout = setTimeout(() => {
        setIsClose(false)
        setPanelHeight(null)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [openIds, panelRef, optionId])

  const hasOpenId = openIds?.[optionId]
  const clickedValue = searchTerms[optionId]

  return (
    <>
      {hasOpenId !== undefined && (
        <div
          className={cx('panel-wrapper', { open: hasOpenId, close: isClose })}
          style={{ '--panel-height': `${panelHeight}px` || '0px' } as React.CSSProperties}
          ref={panelRef}
        >
          {panels
            ? hasOpenId &&
              panels?.map((panel, idx) => (
                <button
                  key={`${panel}-${idx}`}
                  onClick={() => setPanelItem(optionId, panel)}
                  className={cx({
                    active: Array.isArray(clickedValue) && clickedValue?.includes(panel),
                  })}
                >
                  <p>{panel}</p>
                  <CheckedCircleIcon />
                </button>
              ))
            : hasOpenId && <RangeContainer optionId={optionId} />}
        </div>
      )}
    </>
  )
}

export default AccordionPanel
