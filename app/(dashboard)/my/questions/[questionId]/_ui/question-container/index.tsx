'use client'

import { useRef, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { Button } from '@/shared/ui/button'
import { ErrorMessage } from '@/shared/ui/error-message'
import AddQuestionModal from '@/shared/ui/modal/add-question-modal'
import QuestionDeleteModal from '@/shared/ui/modal/question-delete-modal'
import Textarea from '@/shared/ui/textarea'

import useDeleteAnswer from '../../../_hooks/query/use-delete-answer'
import useDeleteQuestion from '../../../_hooks/query/use-delete-question'
import useGetQuestionDetails from '../../../_hooks/query/use-get-question-details'
import usePostAnswer from '../../../_hooks/query/use-post-answer'
import QuestionDetailCard from '../question-detail-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const QuestionContainer = () => {
  const [isActiveAnswer, setIsActiveAnswer] = useState(false)
  const [isAnswerDeleteModalOpen, setIsAnswerDeleteModalOpen] = useState(false)
  const [isQuestionDeleteModalOpen, setIsQuestionDeleteModalOpen] = useState(false)
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false)
  const [answerErrorMessage, setAnswerErrorMessage] = useState<string | null>(null)
  const { questionId } = useParams()
  const router = useRouter()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const { mutate: submitAnswer } = usePostAnswer(parseInt(questionId as string))
  const { mutate: deleteAnswer } = useDeleteAnswer()
  const { mutate: deleteQuestion } = useDeleteQuestion()

  const { data: questionDetails } = useGetQuestionDetails({
    questionId: parseInt(questionId as string),
  })

  const user = useAuthStore((state) => state.user)

  if (!user || !questionDetails) {
    return null
  }

  const isTrader = user.role.includes('TRADER')
  const isInvestor = user.role.includes('INVESTOR')

  const handleQuestionAdd = () => {
    setIsAddQuestionModalOpen(true)
  }

  const handleAnswerAdd = () => {
    setIsActiveAnswer((prevState) => !prevState)
  }

  const handleAnswerSubmit = () => {
    const content = textareaRef.current?.value

    if (!content) {
      setAnswerErrorMessage('답변을 입력해주세요.')
      return
    }

    setAnswerErrorMessage(null)

    submitAnswer(content, {
      onSuccess: () => {
        if (textareaRef.current) {
          textareaRef.current.value = ''
        }
        setIsActiveAnswer(false)
      },
      onError: () => {
        setAnswerErrorMessage('답변 등록에 실패했습니다.')
      },
    })
  }

  const handleDeleteAnswerClick = () => {
    setIsAnswerDeleteModalOpen(true)
  }

  const handleDeleteQuestionClick = () => {
    setIsQuestionDeleteModalOpen(true)
  }

  const handleDeleteAnswer = () => {
    if (!questionDetails?.answer) return
    deleteAnswer(
      {
        questionId: parseInt(questionId as string),
        answerId: questionDetails.answer.answerId,
      },
      {
        onSuccess: () => {
          setIsAnswerDeleteModalOpen(false)
        },
      }
    )
  }

  const handleDeleteQuestion = () => {
    deleteQuestion(
      {
        questionId: parseInt(questionId as string),
        strategyId: questionDetails.strategyId,
      },
      {
        onSuccess: () => {
          setIsQuestionDeleteModalOpen(false)
          router.push(PATH.MY_QUESTIONS)
        },
      }
    )
  }

  return (
    <>
      <div className={cx('container')}>
        <QuestionDetailCard
          isAuthor={isInvestor}
          strategyName={questionDetails.strategyName}
          title={questionDetails.title}
          contents={questionDetails.content}
          nickname={questionDetails.nickname}
          profileImage={questionDetails.profileImageUrl}
          createdAt={questionDetails.createdAt}
          status={questionDetails.state === 'WAITING' ? '답변 대기' : '답변 완료'}
          onDelete={handleDeleteQuestionClick}
        />
        {questionDetails.answer ? (
          <QuestionDetailCard
            type="answer"
            isAuthor={isTrader}
            contents={questionDetails.answer.content}
            nickname={questionDetails.answer.nickname}
            profileImage={questionDetails.answer.profileImageUrl}
            createdAt={questionDetails.answer.createdAt}
            onDelete={handleDeleteAnswerClick}
          />
        ) : (
          <>{!isActiveAnswer && <p className={cx('empty-message')}>아직 답변이 없습니다</p>}</>
        )}
        {isActiveAnswer ? (
          <div className={cx('answer-input-wrapper')}>
            <div className={cx('title-wrapper')}>
              <h2 className={cx('title')}>답변</h2>
              <Button size="small" onClick={handleAnswerSubmit}>
                등록하기
              </Button>
            </div>
            <Textarea placeholder="내용을 입력하세요." ref={textareaRef} />
            <ErrorMessage errorMessage={answerErrorMessage} />
          </div>
        ) : (
          ((isTrader && !questionDetails.answer) || isInvestor) && (
            <Button
              variant="filled"
              className={cx('button')}
              onClick={isTrader ? handleAnswerAdd : handleQuestionAdd}
            >
              {isTrader ? '답변하기' : '추가 질문하기'}
            </Button>
          )
        )}
      </div>
      <QuestionDeleteModal
        isModalOpen={isAnswerDeleteModalOpen}
        onCloseModal={() => setIsAnswerDeleteModalOpen(false)}
        onDelete={handleDeleteAnswer}
        message="답변을 삭제하시겠습니까?"
      />
      <QuestionDeleteModal
        isModalOpen={isQuestionDeleteModalOpen}
        onCloseModal={() => setIsQuestionDeleteModalOpen(false)}
        onDelete={handleDeleteQuestion}
        message="문의 내역을 삭제하시겠습니까?"
      />
      <AddQuestionModal
        strategyId={questionDetails.strategyId}
        isModalOpen={isAddQuestionModalOpen}
        strategyName={questionDetails.strategyName}
        onCloseModal={() => setIsAddQuestionModalOpen(false)}
        title={`RE: ${questionDetails.title}`}
        content={questionDetails.content}
      />
    </>
  )
}

export default QuestionContainer
