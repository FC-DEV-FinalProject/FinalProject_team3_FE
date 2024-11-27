'use client'

import Image from 'next/image'

import classNames from 'classnames/bind'

import Pagination from '@/shared/ui/pagination'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const COUNT_PER_PAGE = 10

interface ImageDataModel {
  imageUrl: string
  title: string
}

interface Props {
  imagesData?: ImageDataModel[]
  currentPage: number
  onPageChange: (page: number) => void
}

const AccountContent = ({ imagesData, currentPage, onPageChange }: Props) => {
  const croppedImagesData = imagesData?.slice(
    COUNT_PER_PAGE * (currentPage - 1),
    COUNT_PER_PAGE * (currentPage - 1) + COUNT_PER_PAGE
  )

  const isTwoLines = croppedImagesData?.length || 0 >= 5

  return (
    <div className={cx('table-wrapper')}>
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