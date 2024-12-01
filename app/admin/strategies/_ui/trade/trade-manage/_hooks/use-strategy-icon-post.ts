import { ChangeEvent, useState } from 'react'

import axios from 'axios'

interface FormDataModel {
  imageFile: File | null
  typeName: string
}

const initailFormData = { imageFile: null, typeName: '' }

const useStrategyIconPost = () => {
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
    if (!isSubmitable) return

    e.preventDefault()
    const { imageFile, typeName } = formData

    try {
      console.log('imageFile', imageFile, 'typeName', typeName)

      const presignedResponse = await axios.post('/api/admin/strategies/trade-type', {
        tradeTypeName: '자동',
        tradeTypeIconUrl: imageFile?.name,
        size: imageFile?.size,
      })

      console.log('p', presignedResponse)

      // const { presignedUrl } = presignedResponse.data.result

      // await axios.put(presignedUrl, imageFile, {
      //   headers: {
      //     'Content-Type': imageFile.type,
      //   },
      // })

      alert('이미지가 성공적으로 업로드되었습니다!')
      setFormData(initailFormData)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('업로드 중 문제가 발생했습니다.')
    }
  }

  return {
    imagePreview,
    setImagePreview,
    onTypeNameInputChange,
    onImageInputChange,
    isSubmitable,
    onFormSubmit,
    formData,
  }
}

export default useStrategyIconPost
