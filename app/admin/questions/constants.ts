import { DropdownOptionModel } from '@/shared/ui/dropdown/types'
import { TabItemModel } from '@/shared/ui/tabs'

export const searchConditions: DropdownOptionModel[] = [
  { label: '제목', value: 'TITLE' },
  { label: '내용', value: 'CONTENT' },
  { label: '제목 + 내용', value: 'TITLE_OR_CONTENT' },
  { label: '트레이더명', value: 'TRADER_NAME' },
  { label: '투자자명', value: 'INVESTOR_NAME' },
  { label: '전략명', value: 'STRATEGY_NAME' },
]

export const tabs: Array<TabItemModel> = [
  { label: '모든 질문', id: 'ALL' },
  { label: '답변대기', id: 'WAITING' },
  { label: '답변완료', id: 'COMPLETED' },
]
