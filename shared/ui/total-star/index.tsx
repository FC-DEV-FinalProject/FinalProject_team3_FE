import classNames from 'classnames/bind'

import Star from '@/shared/ui/total-star/star-icon'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type SizeType = 'small' | 'medium'
export type TextColorType = 'black' | 'gray'

interface Props {
  averageRating?: number
  totalElements?: number
  size?: SizeType
  textColor?: TextColorType
}
const TotalStar = ({
  averageRating = 0,
  totalElements = 0,
  size = 'small',
  textColor = 'gray',
}: Props) => {
  return (
    <div className={cx('container', size, textColor)}>
      <div className={cx('icon')}>
        <Star size={size} />
      </div>
      <p className={cx('text')}>{averageRating}</p>
      <p className={cx('text')}>({totalElements})</p>
    </div>
  )
}

export default TotalStar
