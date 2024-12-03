import classNames from 'classnames/bind'

import ActiveStockManageTable from './_ui/active-stock-manage-table'
import InactiveStockManageTable from './_ui/inactive-stock-manage-table'
import StockPostButton from './_ui/stock-post-button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const StockManage = () => {
  return (
    <div className={cx('container')}>
      <StockPostButton />
      <ActiveStockManageTable />
      <InactiveStockManageTable />
    </div>
  )
}

export default StockManage
