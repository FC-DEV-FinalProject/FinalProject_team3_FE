'use client'

import { useEffect, useRef, useState } from 'react'

import { CloseIcon, OpenIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  content: string
}

const StrategyIntroduction = ({ content }: Props) => {
  const [shouldShowMore, setShouldShowMore] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    checkOverflow()
  }, [content])

  const checkOverflow = () => {
    if (contentRef.current) {
      setIsOverflow(contentRef.current.scrollHeight > contentRef.current.offsetHeight)
    }
  }

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>전략 상세 소개</p>
      <div className={cx('content', { expand: shouldShowMore })}>
        <p ref={contentRef}>{content}</p>
      </div>
      {isOverflow && (
        <div className={cx('button-wrapper')}>
          <button onClick={() => setShouldShowMore(!shouldShowMore)}>
            {shouldShowMore ? (
              <>
                접기
                <CloseIcon />
              </>
            ) : (
              <>
                더보기
                <OpenIcon />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default StrategyIntroduction
