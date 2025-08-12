'use client'

import { useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames/bind'

import { ACCOUNT_PAGE_COUNT } from '@/shared/constants/count-per-page'
import useModal from '@/shared/hooks/custom/use-modal'
import { ImageDataModel } from '@/shared/types/strategy-data'
import { Button } from '@/shared/ui/button'
import Checkbox from '@/shared/ui/check-box'
import AccountImageModal from '@/shared/ui/modal/account-image-modal'
import AccountRegisterModal from '@/shared/ui/modal/account-register-modal'
import Pagination from '@/shared/ui/pagination'
import sliceArray from '@/shared/utils/slice-array'

import { useDeleteAccountImages } from '../../my/_hooks/query/use-delete-account-images'
import useGetMyAccountImages from '../../my/_hooks/query/use-get-my-account-image'
import useGetAccountImages from '../../strategies/[strategyId]/_hooks/query/use-get-account-images'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  strategyId: number
  currentPage: number
  onPageChange: (page: number) => void
  isEditable?: boolean
}

const AccountContent = ({ strategyId, currentPage, onPageChange, isEditable = false }: Props) => {
  const [selectedImage, setSelectedImage] = useState<ImageDataModel | null>(null)
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  const {
    isModalOpen: isViewModalOpen,
    openModal: openViewModal,
    closeModal: closeViewModal,
  } = useModal()

  const {
    isModalOpen: isUploadModalOpen,
    openModal: openUploadModal,
    closeModal: closeUploadModal,
  } = useModal()

  const viewImagesQuery = useGetAccountImages(strategyId)
  const editImagesQuery = useGetMyAccountImages(strategyId)
  const deleteImagesMutation = useDeleteAccountImages()

  const { data, isLoading } = isEditable ? editImagesQuery : viewImagesQuery

  const handleOpenViewModal = (image: ImageDataModel) => {
    setSelectedImage(image)
    openViewModal()
  }

  const handleImageSelect = (id: number, checked: boolean) => {
    setSelectedImages((prev) => {
      if (!checked) {
        return prev.filter((imageId) => imageId !== id)
      }
      return [...prev, id]
    })
  }

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return

    try {
      await deleteImagesMutation.mutateAsync({
        strategyId,
        imageIds: selectedImages,
      })
      setSelectedImages([])
    } catch (err) {
      console.error('Failed to delete images:', err)
    }
  }

  if (!Array.isArray(data?.content) || isLoading) return null

  const imagesData = data.content
  const croppedImagesData: ImageDataModel[] = sliceArray(
    imagesData ?? [],
    ACCOUNT_PAGE_COUNT,
    currentPage
  )

  const isTwoLines = (croppedImagesData?.length || 0) > 4

  return (
    <div className={cx('table-wrapper')}>
      {isEditable && (
        <div className={cx('edit-button-container')}>
          <Button
            size="small"
            className={cx('edit-button')}
            variant="filled"
            onClick={openUploadModal}
          >
            실계좌 이미지 업로드
          </Button>
          <Button
            size="small"
            className={cx('delete-button')}
            variant="outline"
            onClick={handleDeleteSelected}
            disabled={selectedImages.length === 0}
          >
            선택 삭제
          </Button>
        </div>
      )}
      {croppedImagesData?.length > 0 ? (
        <>
          <div className={cx('account-images-container', isTwoLines && 'line')}>
            {croppedImagesData?.map((imageData: ImageDataModel) => (
              <div key={imageData.imageUrl} className={cx('image-data')}>
                <div
                  className={cx('image', {
                    'image-selected': selectedImages.includes(imageData.id),
                  })}
                  onClick={() => handleOpenViewModal(imageData)}
                >
                  <Image src={imageData.imageUrl} alt={imageData.title} fill sizes="100%" />
                </div>
                <div className={cx('title-wrapper')}>
                  {isEditable && (
                    <Checkbox
                      isChecked={selectedImages.includes(imageData.id)}
                      onChange={(checked) => handleImageSelect(imageData.id, checked)}
                      label={imageData.title}
                      textSize="c1"
                      textColor="gray600"
                    />
                  )}
                  {!isEditable && <span className={cx('image-title')}>{imageData.title}</span>}
                </div>
              </div>
            ))}
          </div>
          {imagesData && (
            <Pagination
              currentPage={currentPage}
              maxPage={data.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <div className={cx('no-data')}>
          <p>업데이트 된 실거래계좌 이미지가 없습니다.</p>
        </div>
      )}

      {selectedImage && (
        <AccountImageModal
          isOpen={isViewModalOpen}
          url={selectedImage.imageUrl}
          title={selectedImage.title}
          onClose={closeViewModal}
        />
      )}

      <AccountRegisterModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        strategyId={strategyId}
        uploadType="direct"
        message="실계좌 등록"
      />
    </div>
  )
}

export default AccountContent
