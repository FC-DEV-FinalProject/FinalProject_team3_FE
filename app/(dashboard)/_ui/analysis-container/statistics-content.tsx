import classNames from 'classnames/bind'

import StatisticsTable from '@/shared/ui/table/statistics'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface StatisticsDataModel {
  assetManagement: Record<string, number | string>
  profitLoss: Record<string, number | string>
  ddMddInfo: Record<string, number | string>
  tradingInfo: Record<string, number | string>
}

interface Props {
  statisticsData: StatisticsDataModel
}

const StatisticsContent = ({ statisticsData }: Props) => {
  return (
    <div className={cx('table-wrapper')}>
      {statisticsData ? (
        Object.entries(statisticsData).map(([title, data]) => (
          <StatisticsTable key={title} title={title} statisticsData={data} />
        ))
      ) : (
        <div className={cx('no-data')}>
          <p>업데이트 된 통계 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default StatisticsContent
