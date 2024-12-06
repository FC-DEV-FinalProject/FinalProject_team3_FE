import classNames from 'classnames/bind'

import { formatNumber } from '@/shared/utils/format'

import { STATISTICS_DATE, STATISTICS_PERCENT, inKoreanData } from './constant'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface StatisticsDataModel {
  [key: string]: string | number
}
interface Props {
  title: string
  statisticsData: StatisticsDataModel
}

const StatisticsTable = ({ title, statisticsData }: Props) => {
  const inKoreanDataToArray: string[][] = Object.entries(inKoreanData)
  const mappedDataInKorean: { [key: string]: string | number } = {}
  let titleInKorean = null

  for (const [key, value] of inKoreanDataToArray) {
    if (statisticsData[key] !== undefined) {
      mappedDataInKorean[value] = statisticsData[key]
    } else if (title === key) {
      titleInKorean = value
    }
  }

  const groupedData = Array.from(
    { length: Math.ceil(Object.entries(mappedDataInKorean).length / 2) },
    (_, idx) => {
      const index = idx * 2
      const mappedDataInKoreanToArray = Object.entries(mappedDataInKorean)
      return [
        mappedDataInKoreanToArray[index][0],
        mappedDataInKoreanToArray[index][1],
        mappedDataInKoreanToArray[index + 1]?.[0],
        mappedDataInKoreanToArray[index + 1]?.[1],
      ]
    }
  )

  return (
    <div className={cx('container')}>
      <p>{titleInKorean ?? title}</p>
      <table>
        <tbody>
          {groupedData.map((row, idx) => (
            <tr key={idx}>
              <td>{row[0]}</td>
              <td>
                {STATISTICS_PERCENT.includes(row[0] as string)
                  ? Number(row[1]).toFixed(2) + '%'
                  : formatNumber(row[1])}
                {STATISTICS_DATE.includes(row[0] as string) && '일'}
              </td>
              {row[2] && (
                <>
                  <td>{row[2]}</td>
                  <td>
                    {STATISTICS_PERCENT.includes(row[2] as string)
                      ? Number(row[3]).toFixed(2) + '%'
                      : formatNumber(row[3])}
                    {STATISTICS_DATE.includes(row[2] as string) && '일'}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatisticsTable
