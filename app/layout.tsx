import type { Metadata } from 'next'

import { QueryProvider } from '@/shared/providers'
import { AuthProvider } from '@/shared/providers/auth-provider'
import '@/shared/styles/global.scss'

import { pretendard } from './fonts'

export const metadata: Metadata = {
  title: 'InvestMetic',
  description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <div id="modal-root"></div>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
