import { PATH } from '@/shared/constants/path'
import { LinkButton } from '@/shared/ui/link-button'
import { calculateTableNumber } from '@/shared/utils/table'

import AdminQuestionDeleteButton from '../_ui/admin-question-delete-button'
import AdminQuestionStateBox from '../_ui/admin-question-state-box'
import { AdminQuestionsResponseModel } from '../types'

interface Props {
  data: AdminQuestionsResponseModel['result']['content']
  page: number
  countPerPage: number
}

const setAdminQuestionTableBody = ({ data, page, countPerPage }: Props) =>
  data.map((data, idx) => {
    return [
      calculateTableNumber({ page, idx, countPerPage }),
      data.title,
      data.strategy.name,
      data.trader.userName,
      data.investor.userName,
      <AdminQuestionStateBox questionState={data.stateCondition} key={data.questionId} />,
      <div style={{ display: 'flex', gap: '24px' }} key={data.questionId}>
        <LinkButton
          href={`${PATH.MY_QUESTIONS}/${data.questionId}`}
          size="small"
          style={{
            width: 'fit-content',
            height: '30px',
            padding: '7px 16px',
            borderRadius: '16px',
          }}
        >
          상세보기
        </LinkButton>
        <AdminQuestionDeleteButton questionId={data.questionId} strategyId={data.strategy.id} />
      </div>,
    ]
  })

export default setAdminQuestionTableBody
