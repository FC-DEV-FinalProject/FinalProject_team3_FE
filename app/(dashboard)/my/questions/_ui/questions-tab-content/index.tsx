import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { QuestionSearchOptionsModel } from '@/shared/types/questions'
import Pagination from '@/shared/ui/pagination'

import useGetMyQuestionList from '../../_hooks/query/use-get-my-question-list'
import QuestionCard from '../question-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 3

interface Props {
  options: QuestionSearchOptionsModel
}

const QuestionsTabContent = ({ options }: Props) => {
  const { page, handlePageChange } = usePagination({
    basePath: PATH.MY_QUESTIONS,
    pageSize: COUNT_PER_PAGE,
  })

  const user = useAuthStore((state) => state.user)

  const { data } = useGetMyQuestionList({
    page,
    size: COUNT_PER_PAGE,
    userType: user?.role.includes('TRADER') ? 'TRADER' : 'INVESTOR',
    options,
  })

  if (!data) {
    return
  }

  const questionsData = data.content

  return (
    <>
      <ul className={cx('question-list')}>
        {questionsData &&
          !!questionsData.length &&
          questionsData.map((question) => (
            <li key={question.questionId}>
              <QuestionCard
                questionId={question.questionId}
                strategyName={question.strategyName}
                title={question.title}
                questionState={question.stateCondition}
                contents={question.questionContent}
                nickname={question.nickname}
                createdAt={question.createdAt}
              />
            </li>
          ))}
      </ul>

      {(!questionsData || !questionsData.length) && (
        <p className={cx('empty-message')}>문의 내역이 없습니다.</p>
      )}
      <div className={cx('pagination-wrapper')}>
        {data.totalElements > 0 && (
          <Pagination
            currentPage={page}
            maxPage={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}

export default QuestionsTabContent
