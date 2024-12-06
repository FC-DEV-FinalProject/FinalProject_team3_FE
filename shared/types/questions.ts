import { UserType } from './auth'

export type QuestionStatusType = '답변 대기' | '답변 완료'

export type QuestionStateConditionType = 'WAITING' | 'COMPLETED'
export type QuestionStateTapType = QuestionStateConditionType | 'ALL'

export type QuestionSearchConditionType =
  | 'TITLE'
  | 'CONTENT'
  | 'TITLE_OR_CONTENT'
  | 'TRADER_NAME'
  | 'INVESTOR_NAME'
  | 'STRATEGY_NAME'

export interface QuestionModel {
  questionId: number
  title: string
  questionContent: string
  strategyName: string
  nickname: string
  profileImageUrl: string
  stateCondition: QuestionStateConditionType
  createdAt: string
}

export interface AnswerModel {
  answerId: number
  content: string
  nickname: string
  role: UserType
  profileImageUrl: string
  createdAt: string
}

export interface QuestionDetailsModel {
  questionId: number
  title: string
  content: string
  strategyId: number
  strategyName: string
  profileImageUrl: string
  nickname: string
  state: QuestionStateConditionType
  createdAt: string
  answer: AnswerModel | null
}

export interface QuestionSearchOptionsModel {
  keyword?: string
  searchCondition?: QuestionSearchConditionType
  stateCondition: QuestionStateTapType
}
