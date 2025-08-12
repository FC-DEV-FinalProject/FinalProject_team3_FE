import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const LIST_HEADER = {
  default: ['전략', '분석', 'MDD', 'SM SCORE', '수익률', '구독'],
  my: ['전략', '분석', 'MDD', 'SM SCORE', '수익률', '공개', '관리'],
}

interface Props {
  type?: 'default' | 'my'
}

const ListHeader = ({ type = 'default' }: Props) => {
  return (
    <div className={cx('container', type)}>
      {LIST_HEADER[type].map((category) => (
        <div key={category} className={cx('category')}>
          {category === 'SM SCORE' ? (
            <>
              <span>SM</span> <span>SCORE</span>
            </>
          ) : (
            category
          )}
        </div>
      ))}
    </div>
  )
}

export default ListHeader
