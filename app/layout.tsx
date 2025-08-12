import type { Metadata } from 'next'

import { GoogleAnalytics } from '@next/third-parties/google'

import { QueryProvider } from '@/shared/providers'
import { AuthProvider } from '@/shared/providers/auth-provider'
import '@/shared/styles/global.scss'

import { pretendard } from './fonts'

export const metadata: Metadata = {
  title: 'InvestMetic',
  description: '성공적인 투자 전략을 참고하거나 공유하고 싶다면 인베스트 메틱에서!',
  metadataBase: new URL('https://www.investmetic.co.kr'),
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
            <div id="modal-root" />
          </AuthProvider>
        </QueryProvider>
        <GoogleAnalytics gaId="G-KW2Z1H0QES" />
      </body>
    </html>
  )
}

export default RootLayout
