'use client'

import {
  CategoryIcon,
  NoticeIcon,
  QuestionIcon,
  StrategyRankingIcon,
  TradersIcon,
} from '@/public/icons'

import { PATH } from '@/shared/constants/path'
import SideNavigation from '@/shared/ui/side-navigation'
import NavLinkItem from '@/shared/ui/side-navigation/nav-link-item'

const AdminNavigation = () => {
  return (
    <SideNavigation>
      <NavLinkItem href={PATH.ADMIN_USERS} icon={TradersIcon}>
        회원 관리
      </NavLinkItem>
      <NavLinkItem href={PATH.ADMIN_NOTICES} icon={NoticeIcon}>
        공지사항
      </NavLinkItem>
      <NavLinkItem href={PATH.ADMIN_CATEGORY} icon={CategoryIcon}>
        종목 및 매매 유형
      </NavLinkItem>
      <NavLinkItem href={PATH.ADMIN_STRATEGIES} icon={StrategyRankingIcon}>
        전략 관리
      </NavLinkItem>
      <NavLinkItem href={PATH.ADMIN_QUESTIONS} icon={QuestionIcon}>
        문의 내역
      </NavLinkItem>
    </SideNavigation>
  )
}

export default AdminNavigation
