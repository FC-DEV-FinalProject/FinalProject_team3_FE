import classNames from 'classnames/bind'

import ActiveTradeManageTable from './active-trade-manage-table'
import InactiveTradeManageTable from './inactive-trade-manage-table'
import styles from './styles.module.scss'
import TradePostButton from './trade-post-button'

const cx = classNames.bind(styles)

const TradeManage = () => {
  return (
    <div className={cx('container')}>
      <TradePostButton />
      <ActiveTradeManageTable />
      <InactiveTradeManageTable />
    </div>
  )
}

export default TradeManage
