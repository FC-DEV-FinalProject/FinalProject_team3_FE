import { ChangeEvent, useState } from 'react'

import getPresignedUrl from '../_api/get-presigned-url'
import uploadFileWithPresignedUrl from '../_api/upload-file-with-presigned-url'

interface FormDataModel {
  imageFile: File | null
  typeName: string
}

export type DomainType = 'trade' | 'stock'

const initailFormData = { imageFile: null, typeName: '' }

const useStrategyIconPost = (domain: DomainType) => {
  const [imagePreview, setImagePreview] = useState('')
  const [formData, setFormData] = useState<FormDataModel>(initailFormData)

  const onTypeNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typeName = e.target.value

    setFormData((prev) => ({ ...prev, typeName }))
  }

  const onImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const iconImage = e.target.files?.[0]

    if (iconImage) {
      if (!iconImage.type.startsWith('image/')) {
        alert('이미지 파일만 업로드가 가능해요.')
        return
      }

      setFormData((prev) => ({ ...prev, imageFile: iconImage }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(iconImage)
    } else {
      setImagePreview('')
    }
  }

  const isSubmitable = Object.values(formData).every((value) => Boolean(value))

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { imageFile, typeName } = formData

    if (!imageFile || !typeName) return

    try {
      // console.log('imageFile', imageFile, 'typeName', typeName)

      const presignedUrl = await getPresignedUrl(typeName, imageFile.name, imageFile.size, domain)

      // console.log('p', presignedUrl)

      await uploadFileWithPresignedUrl(presignedUrl, imageFile)

      alert('이미지가 성공적으로 업로드되었습니다!')
      setFormData(initailFormData)
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
      alert('업로드 중 문제가 발생했습니다.')
    }
  }

  return {
    imagePreview,
    onTypeNameInputChange,
    onImageInputChange,
    isSubmitable,
    onFormSubmit,
  }
}

export default useStrategyIconPost
