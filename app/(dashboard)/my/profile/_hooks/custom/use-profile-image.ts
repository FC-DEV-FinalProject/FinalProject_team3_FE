import { ChangeEvent, useEffect, useState } from 'react'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024

export const useProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [isImageVerified, setIsImageVerified] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const validateImage = (file: File): boolean => {
    setImageError(null)
    setIsImageVerified(false)

    if (!file.type.startsWith('image/')) {
      setImageError('이미지 파일만 업로드 가능합니다.')
      return false
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('이미지 크기는 2MB 이하여야 합니다.')
      return false
    }

    setIsImageVerified(true)
    return true
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (validateImage(file)) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
      setSelectedImage(file)
    } else {
      setSelectedImage(null)
      setPreviewUrl(null)
    }
  }

  const handleImageDelete = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedImage(null)
    setPreviewUrl(null)
    setImageError(null)
    setIsImageVerified(false)

    const fileInput = document.getElementById('profile-image') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  return {
    selectedImage,
    previewUrl,
    imageError,
    isImageVerified,
    handleImageChange,
    handleImageDelete,
  }
}
