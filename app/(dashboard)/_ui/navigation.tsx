'use client'

import {
  BookmarkIcon,
  QuestionIcon,
  StrategyIcon,
  StrategyRankingIcon,
  TradersIcon,
} from '@/public/icons'

import { PATH } from '@/shared/constants/path'
import { useAuthStore } from '@/shared/stores/use-auth-store'
import { isTrader } from '@/shared/types/auth'
import SideNavigation from '@/shared/ui/side-navigation'
import NavLinkItem from '@/shared/ui/side-navigation/nav-link-item'

const DashboardNavigation = () => {
  const { user } = useAuthStore()

  return (
    <SideNavigation>
      <NavLinkItem href={PATH.STRATEGIES} icon={StrategyRankingIcon}>
        전략 랭킹
      </NavLinkItem>
      <NavLinkItem href={PATH.TRADERS} icon={TradersIcon}>
        트레이더 목록
      </NavLinkItem>
      {isTrader(user) && (
        <NavLinkItem href={PATH.MY_STRATEGIES} icon={StrategyIcon}>
          나의 전략
        </NavLinkItem>
      )}
      <NavLinkItem href={PATH.FAVORITES} icon={BookmarkIcon}>
        구독한 전략
      </NavLinkItem>
      <NavLinkItem href={PATH.MY_QUESTIONS} icon={QuestionIcon}>
        문의 내역
      </NavLinkItem>
    </SideNavigation>
  )
}

export default DashboardNavigation
