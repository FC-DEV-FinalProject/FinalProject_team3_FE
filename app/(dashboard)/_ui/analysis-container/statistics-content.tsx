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
  if (statisticsData === null || statisticsData === undefined) return null

  const statisticsDataToArray = Object.entries(statisticsData)

  return (
    <div className={cx('table-wrapper')}>
      {statisticsDataToArray.map(([title, data]) => (
        <StatisticsTable key={title} title={title} statisticsData={data} />
      ))}
    </div>
  )
}

export default StatisticsContent
