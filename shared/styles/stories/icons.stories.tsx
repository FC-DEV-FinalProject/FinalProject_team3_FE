import {
  BackIcon,
  BarsIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  CameraIcon,
  CategoryIcon,
  ChangeIcon,
  CheckIcon,
  CheckboxIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  DailyGraphIcon,
  DownloadIcon,
  FileIcon,
  ModalAlertIcon,
  ModalCheckIcon,
  ModalSubscribeIcon,
  MoneyIcon,
  MonthlyGraphIcon,
  NoticeIcon,
  OpenIcon,
  PencilIcon,
  ProfileIcon,
  QuestionIcon,
  RegisterIcon,
  SearchIcon,
  SignOutIcon,
  StarIcon,
  StatisticsIcon,
  StrategyIcon,
  StrategyRankingIcon,
  TradersIcon,
} from '@/public/icons'
import type { Meta, StoryObj as Story } from '@storybook/react'

const meta = {
  title: 'Design System/Icons',
} satisfies Meta

const icons = [
  { name: 'BarsIcon', icon: BarsIcon },
  { name: 'CategoryIcon', icon: CategoryIcon },
  { name: 'ChangeIcon', icon: ChangeIcon },
  { name: 'CheckIcon', icon: CheckIcon },
  { name: 'CheckboxIcon', icon: CheckboxIcon },
  { name: 'ChevronDownIcon', icon: ChevronDownIcon },
  { name: 'ChevronLeftIcon', icon: ChevronLeftIcon },
  { name: 'ChevronRightIcon', icon: ChevronRightIcon },
  { name: 'ChevronUpIcon', icon: ChevronUpIcon },
  { name: 'DailyGraphIcon', icon: DailyGraphIcon },
  { name: 'BookmarkIcon', icon: BookmarkIcon },
  { name: 'BookmarkOutlineIcon', icon: BookmarkOutlineIcon },
  { name: 'FileIcon', icon: FileIcon },
  { name: 'MoneyIcon', icon: MoneyIcon },
  { name: 'MonthlyGraphIcon', icon: MonthlyGraphIcon },
  { name: 'NoticeIcon', icon: NoticeIcon },
  { name: 'OpenIcon', icon: OpenIcon },
  { name: 'CloseIcon', icon: CloseIcon },
  { name: 'PencilIcon', icon: PencilIcon },
  { name: 'ProfileIcon', icon: ProfileIcon },
  { name: 'QuestionIcon', icon: QuestionIcon },
  { name: 'SearchIcon', icon: SearchIcon },
  { name: 'SignOutIcon', icon: SignOutIcon },
  { name: 'StatisticsIcon', icon: StatisticsIcon },
  { name: 'StrategyRankingIcon', icon: StrategyRankingIcon },
  { name: 'StrategyIcon', icon: StrategyIcon },
  { name: 'TradersIcon', icon: TradersIcon },
  { name: 'StarIcon', icon: StarIcon },
  { name: 'BackIcon', icon: BackIcon },
  { name: 'ModalAlertIcon', icon: ModalAlertIcon },
  { name: 'ModalSubscribeIcon', icon: ModalSubscribeIcon },
  { name: 'ModalCheckIcon', icon: ModalCheckIcon },
  { name: 'RegisterIcon', icon: RegisterIcon },
  { name: 'DownloadIcon', icon: DownloadIcon },
  { name: 'CameraIcon', icon: CameraIcon },
]

export const Icons: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '32px', fontWeight: 'bold' }}>Icons</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '16px',
        }}
      >
        {icons.map(({ name, icon: Icon }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px',
              cursor: 'pointer',
            }}
          >
            <Icon style={{ width: '24px', height: '24px', fill: '#797979' }} />
            <span style={{ fontSize: '12px', color: '#797979' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export default meta
