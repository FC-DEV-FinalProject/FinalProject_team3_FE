import { ChangeEvent, useState } from 'react'

import getPresignedUrl from '../_api/get-presigned-url'
import uploadFileWithPresignedUrl from '../_api/upload-file-with-presigned-url'

export type DomainType = 'trade' | 'stock'

const useCategoryIconPost = (domain: DomainType) => {
  const [imagePreview, setImagePreview] = useState('')
  const [typeName, setTypeName] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const onTypeNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typeName = e.target.value

    setTypeName(typeName)
  }

  const onImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const iconImage = e.target.files?.[0]

    if (iconImage) {
      if (!iconImage.type.startsWith('image/')) {
        alert('이미지 파일만 업로드가 가능해요.')
        return
      }

      setImage(iconImage)

      // preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(iconImage)
    } else {
      setImagePreview('')
    }
  }

  const isSubmitable = typeName !== '' && image !== null

  const resetFormData = () => {
    setImage(null)
    setTypeName('')
    setImagePreview('')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSubmitable) return

    try {
      const presignedUrl = await getPresignedUrl(typeName, image.name, image.size, domain)

      await uploadFileWithPresignedUrl(presignedUrl, image)

      alert('이미지가 성공적으로 업로드되었습니다!')
      resetFormData()
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
      throw new Error('업로드 중 문제가 발생했습니다.')
    }
  }

  return {
    typeName,
    resetFormData,
    imagePreview,
    onTypeNameInputChange,
    onImageInputChange,
    isSubmitable,
    onSubmit,
  }
}

export default useCategoryIconPost
