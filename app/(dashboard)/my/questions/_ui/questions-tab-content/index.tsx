import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import { usePagination } from '@/shared/hooks/custom/use-pagination'
import { QuestionModel } from '@/shared/types/questions'
import Pagination from '@/shared/ui/pagination'

import QuestionCard from '../question-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 4

type QuestionTabType = 'all' | 'waiting' | 'complete'

interface Props {
  options: QuestionTabType
}

const QuestionsTabContent = ({ options }: Props) => {
  const { page, handlePageChange } = usePagination({
    basePath: PATH.MY_QUESTIONS,
    pageSize: COUNT_PER_PAGE,
  })
  // TODO: options에 따른 questions 데이터 불러오기
  // 검색 조건 등 추가될 수 있어서 option 대신 options로 사용

  // 임시
  const totalPages = 2

  const questionsData: QuestionModel[] = [
    {
      qnaId: 1,
      userId: 101,
      strategyId: 1,
      title: 'Dynamic ETF 전략 진입 시점 문의드립니다',
      questionContent:
        '현재 시장 상황에서 Dynamic ETF 전략을 시작하려고 하는데, 적절한 진입 시점인지 고민됩니다. MDD 관리는 어떻게 하시는지도 궁금합니다.',
      status: '답변 완료',
      strategyName: 'Dynamic ETF 전략',
      createdAt: '2024-03-15T09:30:00Z',
      profileImageUrl: '/images/profile1.png',
      nickname: '투자초보123',
    },
    {
      qnaId: 2,
      userId: 102,
      strategyId: 6,
      title: 'Active LongShort 전략 레버리지 문의',
      questionContent:
        'Active LongShort 전략에서 사용하시는 레버리지 비율이 궁금합니다. 리스크 관리는 어떻게 하시나요?',
      status: '답변 대기',
      strategyName: 'Active LongShort',
      createdAt: '2024-03-14T15:45:00Z',
      profileImageUrl: '/images/profile2.png',
      nickname: '실전투자자',
    },
    {
      qnaId: 3,
      userId: 103,
      strategyId: 3,
      title: 'Futures Pro 전략 업데이트 일정',
      questionContent:
        '다음 전략 업데이트 일정이 궁금합니다. 현재 수익률이 조금 정체되어 있는 것 같은데 어떻게 보시나요?',
      status: '답변 완료',
      strategyName: 'Futures Pro',
      createdAt: '2024-03-13T11:20:00Z',
      profileImageUrl: '/images/profile3.png',
      nickname: '퓨처스마스터',
    },
    {
      qnaId: 4,
      userId: 104,
      strategyId: 8,
      title: 'High Risk High Return 전략 백테스트 결과 문의',
      questionContent:
        '백테스트 기간과 구체적인 결과가 궁금합니다. 특히 2023년 변동성 장세에서의 성과는 어땠나요?',
      status: '답변 완료',
      strategyName: 'High Risk High Return',
      createdAt: '2024-03-12T16:15:00Z',
      profileImageUrl: '/images/profile4.png',
      nickname: '데이터분석가',
    },
    {
      qnaId: 5,
      userId: 105,
      strategyId: 2,
      title: '고수익 ETF 전략 종목 선정 기준',
      questionContent:
        'ETF 선정 기준과 리밸런싱 주기가 궁금합니다. 또한 현재 포트폴리오에서 가장 비중이 높은 ETF는 무엇인가요?',
      status: '답변 대기',
      strategyName: '고수익 ETF',
      createdAt: '2024-03-11T13:50:00Z',
      profileImageUrl: '/images/profile5.png',
      nickname: 'ETF러버',
    },
  ]

  return (
    <>
      <ul className={cx('question-list')}>
        {questionsData &&
          questionsData.length &&
          questionsData.map((question) => (
            <li key={question.qnaId}>
              <QuestionCard
                qnaId={question.qnaId}
                strategyName={question.strategyName}
                title={question.title}
                status={question.status}
                contents={question.questionContent}
                nickname={question.nickname}
                createdAt={question.createdAt}
              />
            </li>
          ))}
      </ul>

      {!questionsData ||
        (!questionsData.length && <p className={cx('empty-message')}>문의 내역이 없습니다.</p>)}
      <div className={cx('pagination-wrapper')}>
        <Pagination currentPage={page} maxPage={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  )
}

export default QuestionsTabContent
