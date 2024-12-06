import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isActive: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

const TabButton = ({ isActive, onClick, children }: Props) => {
  return (
    <button
      type="button"
      role="tab"
      className={cx('tab-button', isActive && 'active')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default TabButton
