import classNames from 'classnames/bind'

import { PATH } from '@/shared/constants/path'
import Avatar from '@/shared/ui/avatar'
import { LinkButton } from '@/shared/ui/link-button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  nickname: string
  imageUrl?: string
  strategyCount: number
  subscriberCount: number
  userId: number
  hasButton?: boolean
}

const TradersListCard = ({
  nickname,
  strategyCount,
  subscriberCount,
  userId,
  imageUrl,
  hasButton = true,
}: Props) => {
  return (
    <div className={cx('traders-list-card')}>
      <div className={cx('contents')}>
        <div className={cx('trader-info')}>
          <div className={cx('trader-nickname')}>{nickname}</div>
          <div className={cx('count-info')}>
            <div>전략 {strategyCount}개</div>
            <div>구독 {subscriberCount}개</div>
          </div>
        </div>
        <div className={cx('avatar')}>
          <Avatar src={imageUrl} size="large" />
        </div>
      </div>
      {hasButton && (
        <div className="link-button-wrapper">
          <LinkButton
            href={`${PATH.TRADERS}/${userId}`}
            size="medium"
            variant="filled"
            className={cx('link-button')}
          >
            전략 목록 상세보기
          </LinkButton>
        </div>
      )}
    </div>
  )
}

export default TradersListCard
