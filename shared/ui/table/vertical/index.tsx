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

export interface VerticalTableProps {
  tableHead: string[]
  tableBody: TableBodyDataType[]
  countPerPage: number
  currentPage: number
  className?: string
  renderActions?: (row: TableBodyDataType) => ReactNode | null
  hideFirstColumn?: boolean
  colWidths?: number[]
}

const VerticalTable = ({
  tableHead,
  tableBody,
  countPerPage,
  currentPage,
  className,
  renderActions,
  hideFirstColumn = false,
  colWidths = [],
}: VerticalTableProps) => {
  const hasData = tableBody.length > 0
  const slicedTableBody = sliceArray(tableBody, countPerPage, currentPage)

  const widths = colWidths.length > 0 ? colWidths : new Array(tableHead.length).fill(1)

  const totalWidth = widths.reduce((sum, width) => sum + width, 0)

  return (
    <div className={cx('container', className)}>
      <table>
        <colgroup>
          {widths.map((width, index) => (
            <col key={index} style={{ width: `${(width / totalWidth) * 100}%` }} />
          ))}
          {renderActions && <col style={{ width: '150px' }} />}
        </colgroup>
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

const Skeleton = ({
  tableHead,
  countPerPage,
  renderActions,
  colWidths = [],
}: Partial<VerticalTableProps>) => {
  if (!tableHead || !countPerPage) return null

  const widths = colWidths.length > 0 ? colWidths : new Array(tableHead.length).fill(1)

  const totalWidth = widths.reduce((sum, width) => sum + width, 0)

  return (
    <div className={cx('container')}>
      <table>
        <colgroup>
          {widths.map((width, index) => (
            <col key={index} style={{ width: `${(width / totalWidth) * 100}%` }} />
          ))}
          {renderActions && <col style={{ width: '150px' }} />}
        </colgroup>
        <thead>
          <tr>
            {tableHead.map((head) => (
              <td key={head}>{head}</td>
            ))}
            {renderActions && <td></td>}
          </tr>
        </thead>
        <tbody>
          {[...Array(countPerPage)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {tableHead.map((_, colIdx) => (
                <td key={colIdx} className={cx('skeleton-cell')}>
                  <div className={cx('skeleton-content')} />
                </td>
              ))}
              {renderActions && (
                <td className={cx('button-container')}>
                  <div className={cx('skeleton-button')} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

VerticalTable.Skeleton = Skeleton

export default VerticalTable
