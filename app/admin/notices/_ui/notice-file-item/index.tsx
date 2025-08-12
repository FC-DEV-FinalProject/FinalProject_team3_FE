import classNames from 'classnames/bind'

import styles from './styles.module.scss'

interface Props {
  name: string
  id: number | string
  onDeleteFile: (id: number | string) => void
}

const cx = classNames.bind(styles)

const NoticeFileItem = ({ name, id, onDeleteFile }: Props) => {
  return (
    <li className={cx('container')}>
      <span className={cx('name')}>{name}</span>
      <button className={cx('button')} type="button" onClick={() => onDeleteFile(id)}>
        삭제
      </button>
    </li>
  )
}

export default NoticeFileItem
