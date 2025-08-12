import { DropdownOptionModel } from '@/shared/ui/dropdown/types'
import { TabItemModel } from '@/shared/ui/tabs'

export const searchOptions: DropdownOptionModel[] = [
  { label: '닉네임', value: 'NICKNAME' },
  { label: '이메일', value: 'EMAIL' },
  { label: '이름', value: 'NAME' },
  { label: '핸드폰 번호', value: 'PHONE' },
]

export const tabs: Array<TabItemModel> = [
  { label: '모든 회원', id: 'ALL' },
  { label: '일반', id: 'INVESTOR' },
  { label: '트레이더', id: 'TRADER' },
  { label: '관리자', id: 'ADMIN' },
]

export const investorOptions: DropdownOptionModel[] = [
  { label: '일반', value: 'INVESTOR' },
  { label: '관리자', value: 'INVESTOR_ADMIN' },
]

export const traderOptions: DropdownOptionModel[] = [
  { label: '트레이더', value: 'TRADER' },
  { label: '관리자', value: 'TRADER_ADMIN' },
]
