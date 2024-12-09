'use client'

import { ReactNode } from 'react'

import { NoticeListContentModel } from '@/app/(landing)/notices/_ui/notice-table'
import classNames from 'classnames/bind'

import {
  DailyAnalysisModel,
  MonthlyAnalysisModel,
  MyDailyAnalysisModel,
} from '@/shared/types/strategy-data'
import { formatNumber } from '@/shared/utils/format'
import sliceArray from '@/shared/utils/slice-array'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type TableBodyDataType =
  | DailyAnalysisModel
  | MyDailyAnalysisModel
  | MonthlyAnalysisModel
  | NoticeListContentModel
  | Array<ReactNode | string | number>

export const isMyAnalysisData = (data: TableBodyDataType): data is MyDailyAnalysisModel => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false

  return (
    'dailyAnalysisId' in data &&
    'dailyDate' in data &&
    'transaction' in data &&
    'dailyProfitLoss' in data &&
    'principal' in data
  )
}

export interface VerticalTableProps {
  tableHead: string[]
  tableBody: TableBodyDataType[]
  countPerPage: number
  currentPage: number
  className?: string
  renderActions?: (row: TableBodyDataType) => ReactNode | null
  hideFirstColumn?: boolean
}

const VerticalTable = ({
  tableHead,
  tableBody,
  countPerPage,
  currentPage,
  className,
  renderActions,
  hideFirstColumn = false,
}: VerticalTableProps) => {
  const hasData = tableBody.length > 0
  const slicedTableBody = sliceArray(tableBody, countPerPage, currentPage)

  return (
    <div className={cx('container', className)}>
      <table>
        <thead>
          <tr>
            {tableHead.map((head) => (
              <td key={head}>{head}</td>
            ))}
            {renderActions && <td></td>}
          </tr>
        </thead>
        {hasData && (
          <tbody>
            {slicedTableBody.map((row) => (
              <tr key={Object.values(row)[0]}>
                {Object.values(row)
                  .slice(hideFirstColumn ? 1 : 0)
                  .map((data, idx) => (
                    <td key={`${data}-${idx}`}>{formatNumber(data)}</td>
                  ))}
                {renderActions && <td className={cx('button-container')}>{renderActions(row)}</td>}
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

const Skeleton = ({ tableHead, countPerPage, renderActions }: Partial<VerticalTableProps>) => {
  return (
    <div className={cx('container')}>
      <table>
        <thead>
          <tr>
            {tableHead?.map((head) => <td key={head}>{head}</td>)}
            {renderActions && <td>관리</td>}
          </tr>
        </thead>
      </table>
      <div className={cx('no-data')} style={{ height: `calc(40px * ${countPerPage}` }} />
    </div>
  )
}

VerticalTable.Skeleton = Skeleton

export default VerticalTable
