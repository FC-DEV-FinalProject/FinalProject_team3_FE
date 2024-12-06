import BackHeader from '@/shared/ui/header/back-header'
import Title from '@/shared/ui/title'

import QuestionContainer from './_ui/question-container'

const QuestionDetailPage = () => {
  return (
    <>
      <BackHeader label={'문의 내역으로 돌아가기'} />
      <Title label="문의 내역" />
      <QuestionContainer />
    </>
  )
}

export default QuestionDetailPage
