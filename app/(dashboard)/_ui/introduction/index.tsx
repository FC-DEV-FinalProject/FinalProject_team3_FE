'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { CloseIcon, OpenIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Textarea from '@/shared/ui/textarea'

import useEditInformationStore from '../../my/strategies/manage/[strategyId]/_store/use-edit-information-store'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  content: string
  isEditable?: boolean
}

const StrategyIntroduction = ({ content, isEditable = false }: Props) => {
  const [shouldShowMore, setShouldShowMore] = useState(false)
  const [editContent, setEditContent] = useState<HTMLTextAreaElement | string | null>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const contentRef = useRef<HTMLPreElement>(null)
  const setDescription = useEditInformationStore((state) => state.actions.setDescription)

  useEffect(() => {
    checkOverflow()
    setEditContent(content)
  }, [content])

  useEffect(() => {
    if (editContent) {
      setDescription(editContent as string)
    }
  }, [editContent])

  const checkOverflow = () => {
    if (contentRef.current) {
      setIsOverflow(contentRef.current.scrollHeight > contentRef.current.offsetHeight)
    }
  }

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>전략 상세 소개</p>
      <div className={cx('content', { expand: shouldShowMore })}>
        {isEditable ? (
          <Textarea
            className={cx('textarea')}
            value={editContent as string}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditContent(e.target.value)}
          />
        ) : (
          <pre ref={contentRef}>{content}</pre>
        )}
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
