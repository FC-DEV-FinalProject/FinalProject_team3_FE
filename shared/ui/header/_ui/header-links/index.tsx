import { PATH } from '@/shared/constants/path'
import { Button } from '@/shared/ui/button'
import { LinkButton } from '@/shared/ui/link-button'

const HeaderLinks = () => {
  return (
    <Button.ButtonGroup gap="24px">
      <LinkButton href={PATH.STRATEGIES} size="small">
        대시보드
      </LinkButton>
      <LinkButton href={PATH.SIGN_IN} size="small">
        로그인
      </LinkButton>
      <LinkButton href={PATH.SIGN_UP_USER_TYPE} size="small" variant="filled">
        회원가입
      </LinkButton>
    </Button.ButtonGroup>
  )
}

export default HeaderLinks
