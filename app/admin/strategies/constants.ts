import { DropdownOptionModel } from '@/shared/ui/dropdown/types'
import { TabItemModel } from '@/shared/ui/tabs'

export const tabs: Array<TabItemModel> = [
  { label: '모든 전략', id: 'ALL' },
  { label: '승인 대기', id: 'PENDING' },
]

export const strategyPublicOptions: DropdownOptionModel[] = [
  { label: '공개', value: 'PUBLIC' },
  { label: '비공개', value: 'PRIVATE' },
]
