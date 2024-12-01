export type QuestionStatusType = '답변 대기' | '답변 완료'

export interface QuestionModel {
  qnaId: number
  userId: number
  strategyId: number
  title: string
  questionContent: string
  status: QuestionStatusType
  strategyName: string
  createdAt: string
  profileImageUrl: string
  nickname: string
}
