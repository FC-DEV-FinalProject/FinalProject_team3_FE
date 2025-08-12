'use client'

import { useEffect, useRef, useState } from 'react'

import usePostQuestion from '@/app/(dashboard)/strategies/[strategyId]/_hooks/query/use-post-question'
import { RegisterIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import { ErrorMessage } from '../error-message'
import Input from '../input'
import Textarea from '../textarea'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  strategyName: string
  title?: string
  content?: string
  strategyId: number
  onCloseModal: () => void
  guideOpenModal?: () => void
}

const AddQuestionModal = ({
  isModalOpen,
  strategyName,
  title,
  content,
  strategyId,
  onCloseModal,
  guideOpenModal,
}: Props) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const { mutate } = usePostQuestion()

  const handleAddQuestion = () => {
    if (titleRef.current && contentRef.current) {
      const title = titleRef.current.value.trim()
      const content = contentRef.current.value.trimEnd()
      if (title !== '' && content !== '') {
        const question = {
          strategyId,
          title: titleRef.current.value,
          content: contentRef.current.value,
        }
        mutate(question, {
          onSuccess: (result) => {
            if (result?.isSuccess) {
              onCloseModal()
              if (guideOpenModal) {
                guideOpenModal()
              }
            }
          },
        })
      } else {
        setIsEmpty(true)
      }
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isModalOpen && titleRef?.current && contentRef?.current) {
      titleRef.current.value = title || ''
      contentRef.current.value = content ? `\n\n----- 이전 문의내역 -----\n${content}` : ''
    }
  }, [isModalOpen])

  return (
    <Modal
      isOpen={isModalOpen}
      message={title ? '추가 문의하기' : '문의하기'}
      icon={RegisterIcon}
      className="question"
    >
      <span className={cx('message', 'strategy-name')}>{strategyName}</span>
      <div className={cx('question-title')}>
        <p>제목</p>
        <div>
          <Input ref={titleRef} inputSize="full" placeholder="제목을 입력하세요" />
        </div>
      </div>
      <div className={cx('question-content')}>
        <p>내용</p>
        <Textarea ref={contentRef} placeholder="내용을 입력하세요." className={cx('content')} />
      </div>
      {isEmpty && <ErrorMessage errorMessage="제목 또는 내용을 모두 입력해주세요." />}
      <div className={cx('two-button', 'question')}>
        <Button onClick={onCloseModal}>취소</Button>
        <Button onClick={handleAddQuestion} variant="filled" className={cx('button')}>
          문의
        </Button>
      </div>
    </Modal>
  )
}

export default AddQuestionModal
