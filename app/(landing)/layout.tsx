'use client'

import { usePathname } from 'next/navigation'

import { useAuthStore } from '@/shared/stores/use-auth-store'
import Footer from '@/shared/ui/footer'
import LogoHeader from '@/shared/ui/header/logo-header'

interface Props {
  children: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  const pathname = usePathname()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasFooter = !pathname.includes('/signin') && !pathname.includes('/signup')
  return (
    <>
      <LogoHeader hasText={true} hasLinks={true} isLoggedIn={isAuthenticated ? true : false} />
      <main className="landing-main">{children}</main>
      {hasFooter && <Footer />}
    </>
  )
}

export default LandingLayout
