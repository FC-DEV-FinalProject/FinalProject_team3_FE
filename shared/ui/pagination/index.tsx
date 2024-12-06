'use client'

import { useCallback, useEffect, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/public/icons'
import cx from 'classnames'

import styles from './pagination.module.scss'

const DOTS = '...'
const PAGES_TO_SHOW = 7
const PAGE_THRESHOLD = 10
const BOUNDARY_PAGES = 4
type PageType = number | string

interface Props {
  currentPage: number
  maxPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, maxPage, onPageChange }: Props) => {
  const [pages, setPages] = useState<PageType[]>([])

  const getSequentialPages = useCallback((start: number, length: number) => {
    return Array.from({ length }, (_, idx) => start + idx)
  }, [])

  const calculatePages = useCallback(() => {
    if (maxPage < PAGE_THRESHOLD) {
      return getSequentialPages(1, maxPage)
    }

    if (currentPage < BOUNDARY_PAGES + 1) {
      return [...getSequentialPages(1, PAGES_TO_SHOW), DOTS, maxPage]
    }

    if (currentPage <= maxPage - BOUNDARY_PAGES) {
      return [1, DOTS, ...getSequentialPages(currentPage - 2, 5), DOTS, maxPage]
    }

    return [1, DOTS, ...getSequentialPages(maxPage - 6, PAGES_TO_SHOW)]
  }, [currentPage, maxPage, getSequentialPages])

  useEffect(() => {
    setPages(calculatePages())
  }, [calculatePages])

  const handleLeft = () => onPageChange(Math.max(1, currentPage - 1))
  const handleRight = () => onPageChange(Math.min(maxPage, currentPage + 1))
  const handlePageClick = (page: PageType) => {
    if (typeof page === 'number') onPageChange(page)
  }

  return (
    <div className={styles.pagination}>
      {currentPage !== 1 && (
        <button className={styles.left} onClick={handleLeft}>
          <ChevronLeftIcon />
        </button>
      )}
      {pages.map((page, idx) => (
        <button
          key={`${page}-${idx}`}
          className={cx(styles.page, {
            [styles.active]: page === currentPage,
          })}
          disabled={page === DOTS}
          style={page === DOTS ? { cursor: 'default' } : {}}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      {currentPage !== maxPage && (
        <button className={styles.right} onClick={handleRight}>
          <ChevronRightIcon />
        </button>
      )}
    </div>
  )
}

export default Pagination
