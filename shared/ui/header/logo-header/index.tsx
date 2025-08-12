import Logo from '@/shared/ui/logo'

import Header from '..'
import HeaderLinks from '../_ui/header-links'

const headerStyles = {
  background: 'rgba(251, 251, 251, 0.5)',
  backdropFilter: 'blur(60px)',
}

interface Props {
  hasLinks?: boolean
  hasText?: boolean
  isLoggedIn?: boolean
}

const LogoHeader = ({ hasLinks = false, hasText = false, isLoggedIn = false }: Props) => {
  return (
    <Header
      Left={<Logo hasText={hasText} />}
      Right={hasLinks && <HeaderLinks isLoggedIn={isLoggedIn} />}
      styles={headerStyles}
    />
  )
}

export default LogoHeader
