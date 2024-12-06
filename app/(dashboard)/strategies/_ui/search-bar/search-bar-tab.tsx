import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isMainTab: boolean
  onChangeTab: (isMainTab: boolean) => void
}

const SearchBarTab = ({ isMainTab, onChangeTab }: Props) => {
  return (
    <div className={cx('tab-container')}>
      <Button
        className={cx('button', isMainTab ? 'main-on' : 'main-off')}
        onClick={() => onChangeTab(!isMainTab)}
      >
        항목별
      </Button>
      <Button
        className={cx('button', isMainTab ? 'main-off' : 'main-on')}
        onClick={() => onChangeTab(!isMainTab)}
      >
        알고리즘별
      </Button>
    </div>
  )
}

export default SearchBarTab
