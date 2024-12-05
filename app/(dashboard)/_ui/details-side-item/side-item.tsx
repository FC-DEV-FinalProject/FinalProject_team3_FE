import { useRef, useState } from 'react'

import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import Avatar from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import AddQuestionModal from '@/shared/ui/modal/add-question-modal'
import QuestionGuideModal from '@/shared/ui/modal/question-guide-modal'
import { formatNumber } from '@/shared/utils/format'

import { TitleType } from '.'
import usePostQuestion from '../../strategies/[strategyId]/_hooks/query/use-post-question'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  title: Omit<TitleType, '트레이더' | '최소 투자 금액' | '투자 원금'>
  data: number | string
  profileImage?: string
  isMyStrategy?: boolean
  strategyName?: string
}

const SideItem = ({
  strategyId,
  title,
  data,
  profileImage,
  isMyStrategy = false,
  strategyName,
}: Props) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const {
    isModalOpen: isAddQuestionModalOpen,
    openModal: questionOpenModal,
    closeModal: questionCloseModal,
  } = useModal()
  const {
    isModalOpen: isQuestionGuideModalOpen,
    openModal: guideOpenModal,
    closeModal: guideCloseModal,
  } = useModal()
  const user = useAuthStore((state) => state.user)
  const titleRef = useRef<HTMLInputElement | null>(null)
  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  const { mutate } = usePostQuestion()

  const handleAddQuestion = () => {
    if (titleRef.current && contentRef.current) {
      const title = titleRef.current.value.trim()
      const content = contentRef.current.value.trim()
      if (title !== '' && content !== '') {
        const question = {
          strategyId,
          title: titleRef.current.value,
          content: contentRef.current.value,
        }
        mutate(question, {
          onSuccess: (result) => {
            if (result?.isSuccess) {
              questionCloseModal()
              guideOpenModal()
            }
          },
        })
      } else {
        setIsEmpty(true)
      }
    }
  }
  const isTrader = user?.role.includes('TRADER')

  return (
    <div className={cx('side-item')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('data')}>
        {title === '트레이더' ? (
          <>
            <div className={cx('avatar')}>
              <Avatar src={profileImage} />
              <p>{data}</p>
            </div>
            {!isMyStrategy && !isTrader && (
              <Button onClick={questionOpenModal} size="small" style={{ height: '30px' }}>
                문의하기
              </Button>
            )}
          </>
        ) : (
          <p>{formatNumber(data)}</p>
        )}
      </div>
      {strategyName && (
        <AddQuestionModal
          strategyName={strategyName}
          isModalOpen={isAddQuestionModalOpen}
          titleRef={titleRef}
          contentRef={contentRef}
          onCloseModal={questionCloseModal}
          onChange={handleAddQuestion}
          isEmpty={isEmpty}
        />
      )}
      <QuestionGuideModal isModalOpen={isQuestionGuideModalOpen} onCloseModal={guideCloseModal} />
    </div>
  )
}

export default SideItem
