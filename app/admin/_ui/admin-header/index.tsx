import { CSSProperties, ReactNode } from 'react'

import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  Left?: ReactNode
  Right?: ReactNode
  styles?: CSSProperties
  className?: string
}

const AdminContentsHeader = ({ Left, Right, className }: Props) => {
  return (
    <div className={cx('container', className)}>
      {Left}
      {Right}
    </div>
  )
}

export default AdminContentsHeader
