'use client'

import Image from 'next/image'

import classNames from 'classnames/bind'

import { ACCOUNT_PAGE_COUNT } from '@/shared/constants/count-per-page'
import { Button } from '@/shared/ui/button'
import Pagination from '@/shared/ui/pagination'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface ImageDataModel {
  imageUrl: string
  title: string
}

interface Props {
  imagesData?: ImageDataModel[]
  currentPage: number
  onPageChange: (page: number) => void
  isEditable?: boolean
}

const AccountContent = ({ imagesData, currentPage, onPageChange, isEditable = false }: Props) => {
  const croppedImagesData = imagesData?.slice(
    ACCOUNT_PAGE_COUNT * (currentPage - 1),
    ACCOUNT_PAGE_COUNT * (currentPage - 1) + ACCOUNT_PAGE_COUNT
  )

  const isTwoLines = croppedImagesData?.length || 0 >= 5

  return (
    <div className={cx('table-wrapper')}>
      {isEditable && (
        <div className={cx('edit-button-container')}>
          <Button size="small" className={cx('edit-button')} variant="filled">
            실계좌 이미지 업로드
          </Button>
          <Button size="small" className={cx('delete-button')} variant="outline">
            선택 삭제
          </Button>
        </div>
      )}
      {croppedImagesData && croppedImagesData.length !== 0 ? (
        <>
          <div className={cx('account-images-container', isTwoLines && 'line')}>
            {croppedImagesData?.map((imageData) => (
              <div key={imageData.imageUrl} className={cx('image-data')}>
                <div className={cx('image')}>
                  <Image src={imageData.imageUrl} alt={imageData.title} fill />
                </div>
                <span>{imageData.title}</span>
              </div>
            ))}
          </div>
          {imagesData && (
            <Pagination
              currentPage={currentPage}
              maxPage={Math.ceil(imagesData.length / 5)}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <div className={cx('no-data')}>
          <p>업데이트 된 실거래계좌 이미지가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default AccountContent
