import classNames from 'classnames/bind'

import ActiveTradeManageTable from './_ui/active-trade-manage-table'
import InactiveTradeManageTable from './_ui/inactive-trade-manage-table'
import TradePostButton from './_ui/trade-post-button'
import styles from './styles.module.scss'

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
