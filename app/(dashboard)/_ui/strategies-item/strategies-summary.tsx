import classNames from 'classnames/bind'

import Avatar from '@/shared/ui/avatar'
import TotalStar from '@/shared/ui/total-star'

import StrategiesIcon from './strategies-icon'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface ProfileModel {
  traderImage?: string
  nickname: string
}

interface Props {
  iconUrls?: string[]
  iconNames?: string[]
  title: string
  profile: ProfileModel
  subscriptionCount: number
  averageRating: number
  totalReview: number
}

const StrategiesSummary = ({
  iconUrls,
  iconNames,
  title,
  profile,
  subscriptionCount,
  averageRating,
  totalReview,
}: Props) => {
  return (
    <div className={cx('summary')}>
      <StrategiesIcon iconUrls={iconUrls} iconNames={iconNames} />
      <p className={cx('title')}>{title}</p>
      <div className={cx('trader-profile')}>
        <Avatar size={'medium'} src={profile.traderImage} />
        <p>{profile.nickname}</p>
      </div>
      <div className={cx('total-subscribe-star')}>
        <p>구독 {subscriptionCount}개</p>
        <p>|</p>
        <TotalStar averageRating={averageRating} totalElements={totalReview} textColor="black" />
      </div>
    </div>
  )
}

export default StrategiesSummary
