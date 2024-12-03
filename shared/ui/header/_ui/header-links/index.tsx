import { PATH } from '@/shared/constants/path'
import { useAuth } from '@/shared/hooks/custom/use-auth'
import { Button } from '@/shared/ui/button'
import { LinkButton } from '@/shared/ui/link-button'

interface Props {
  isLoggedIn?: boolean
}

const HeaderLinks = ({ isLoggedIn }: Props) => {
  const { logout } = useAuth()
  return (
    <Button.ButtonGroup gap="24px">
      <LinkButton href={PATH.STRATEGIES} size="small">
        대시보드
      </LinkButton>
      {!isLoggedIn && (
        <LinkButton href={PATH.SIGN_IN} size="small">
          로그인
        </LinkButton>
      )}
      {isLoggedIn ? (
        <Button onClick={logout} size="small" variant="filled">
          로그아웃
        </Button>
      ) : (
        <LinkButton href={PATH.SIGN_UP_USER_TYPE} size="small" variant="filled">
          회원가입
        </LinkButton>
      )}
    </Button.ButtonGroup>
  )
}

export default HeaderLinks
