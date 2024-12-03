// import { TABLE_DATA } from '@/app/admin/notices/tabledata'
import { ReactNode } from 'react'

import classNames from 'classnames/bind'

import { DailyAnalysisModel, MonthlyAnalysisModel } from '@/shared/types/strategy-data'
import { Button } from '@/shared/ui/button'
import { formatNumber } from '@/shared/utils/format'
import sliceArray from '@/shared/utils/slice-array'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type TableBodyDataType =
  | DailyAnalysisModel
  | MonthlyAnalysisModel
  | Array<ReactNode | string | number>

export interface VerticalTableProps {
  tableHead: string[]
  tableBody: TableBodyDataType[]
  countPerPage: number
  currentPage: number
  isEditable?: boolean
}

const VerticalTable = ({
  tableHead,
  tableBody,
  countPerPage,
  currentPage,
  isEditable = false,
}: VerticalTableProps) => {
  const hasData = tableBody.length > 0
  const slicedTableBody = sliceArray(tableBody, countPerPage, currentPage)

  return (
    <div className={cx('container')}>
      <table>
        <thead>
          <tr>
            {tableHead.map((head) => (
              <td key={head}>{head}</td>
            ))}
            {isEditable && <td></td>}
          </tr>
        </thead>
        {hasData && (
          <tbody>
            {slicedTableBody.map((row) => (
              <tr key={Object.values(row)[0]}>
                {Object.values(row).map((data, idx) => (
                  <td key={data + idx}>{formatNumber(data)}</td>
                ))}
                {isEditable && (
                  <td className={cx('button-container')}>
                    <Button size="small" variant="outline" className={cx('edit-button')}>
                      수정
                    </Button>
                    <Button size="small" variant="filled" className={cx('delete-button')}>
                      삭제
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!hasData && (
        <div className={cx('no-data')} style={{ height: `calc(40px * ${countPerPage}` }}>
          데이터가 존재하지 않습니다.
        </div>
      )}
    </div>
  )
}

export default VerticalTable
