import { QuestionStateConditionType } from '@/shared/types/questions'
import { APIResponseBaseModel } from '@/shared/types/response'

export interface AdminQuestionsResponseModel extends APIResponseBaseModel<boolean> {
  result: {
    content: Array<{
      strategy: {
        id: number
        name: string
      }
      investor: {
        id: number
        userName: string
        profileImageUrl: string
      }
      trader: {
        id: number
        userName: string
        profileImageUrl: string
      }
      questionId: number
      title: string
      questionContent: string
      stateCondition: QuestionStateConditionType
      createdAt: string
    }>
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}
