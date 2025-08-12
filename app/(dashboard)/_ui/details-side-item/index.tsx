import classNames from 'classnames/bind'

import SideItem from './side-item'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type TitleType =
  | '트레이더'
  | '최소 투자 금액'
  | '투자 원금'
  | 'KP Ratio'
  | 'SM SCORE'
  | '최종손익입력일자'
  | '등록일'

export interface InformationModel {
  title: TitleType
  data: string | number
}

interface Props {
  strategyId: number
  information: InformationModel | InformationModel[]
  profileImage?: string
  isMyStrategy?: boolean
  strategyName?: string
  isEditable?: boolean
}

const DetailsSideItem = ({
  strategyId,
  information,
  profileImage,
  isEditable = false,
  isMyStrategy = true,
  strategyName,
}: Props) => {
  const isArray = Array.isArray(information)
  return (
    <>
      {isArray ? (
        <div className={cx('side-items', { edit: isEditable })}>
          {information.map((item) => (
            <div key={item.title}>
              <div className={cx('title')}>{item.title}</div>
              <div className={cx('data')}>
                <p>{typeof item.data === 'number' ? item.data.toFixed(2) : item.data}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SideItem
          strategyId={strategyId}
          title={information.title}
          data={information.data}
          profileImage={profileImage}
          isMyStrategy={isMyStrategy}
          strategyName={strategyName}
          isEditable={isEditable}
        />
      )}
    </>
  )
}

export default DetailsSideItem
