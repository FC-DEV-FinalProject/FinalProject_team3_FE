import { Button } from '@/shared/ui/button'

import AdminQuestionDeleteButton from '../_ui/admin-question-delete-button'
import AdminQuestionStateBox from '../_ui/admin-question-state-box'
import { AdminQuestionsResponeseModel } from '../types'

const setAdminQuestionTableBody = (data: AdminQuestionsResponeseModel['result']['content']) =>
  data.map((data, idx) => {
    return [
      idx + 1,
      data.title,
      data.strategy.name,
      data.trader.userName,
      data.investor.userName,
      <AdminQuestionStateBox questionState={data.stateCondition} key={data.questionId} />,
      <Button.ButtonGroup gap="24px" key={data.questionId}>
        <Button
          size="small"
          style={{
            width: 'fit-content',
            height: '30px',
            padding: '7px 16px',
            borderRadius: '16px',
          }}
        >
          상세보기
        </Button>
        <AdminQuestionDeleteButton questionId={data.questionId} strategyId={data.strategy.id} />
      </Button.ButtonGroup>,
    ]
  })

export default setAdminQuestionTableBody
