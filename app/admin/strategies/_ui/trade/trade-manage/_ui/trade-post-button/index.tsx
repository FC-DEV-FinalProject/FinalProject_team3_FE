'use client'

import { CSSProperties, useState } from 'react'

import FileInput from '@/app/admin/strategies/_ui/shared/file-input'
import { RegisterIcon } from '@/public/icons'
import axios from 'axios'
import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TradePostButton = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const onClick = () => openModal()

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.')
        return
      }

      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      alert('이미지를 선택하세요!')
      return
    }

    try {
      console.log('f', imageFile)

      const presignedResponse = await axios.post('/api/admin/strategies/trade-type', {
        tradeTypeName: '자동',
        tradeTypeIconUrl: imageFile.name,
        size: imageFile.size,
      })

      console.log('p', presignedResponse)

      const { presignedUrl } = presignedResponse.data.result

      await axios.put(presignedUrl, imageFile, {
        headers: {
          'Content-Type': imageFile.type,
        },
      })

      alert('이미지가 성공적으로 업로드되었습니다!')
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('업로드 중 문제가 발생했습니다.')
    }
  }

  return (
    <>
      <Button onClick={onClick} variant="filled" size="small" style={buttonStyles}>
        매매 유형 등록하기
      </Button>
      <Modal icon={<RegisterIcon />} message="매매유형 등록" isOpen={isModalOpen}>
        <form onSubmit={onSubmit} className={cx('form')}>
          <div className={cx('input-container')}>
            <div className={cx('input-field')}>
              유형 <Input placeholder="유형을 입력해주세요." className={cx('input')} />
            </div>
            <div className={cx('input-field')}>
              아이콘{' '}
              <FileInput
                preview={imagePreview ?? ''}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className={cx('button-group')}>
            <Button onClick={closeModal} type="button" className={cx('button')}>
              취소
            </Button>
            <Button variant="filled" className={cx('button')}>
              등록
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

const buttonStyles: CSSProperties = {
  position: 'absolute',
  top: '-144px',
  right: 0,
  padding: '12px 24px',
}

export default TradePostButton

//   const fetchTrade = async () => {
//     const res = await fetch('http://15.164.90.102:8081/api/strategies/trade-type', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         tradeTypeName: '자동',
//         tradeTypeIconUrl: 'IconTest.png',
//         size: 526,
//       }),
//     })
