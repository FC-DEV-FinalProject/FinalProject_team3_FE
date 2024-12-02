import { useState } from 'react'

import axios from 'axios'
import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'

import ActiveStockManageTable from './_ui/active-stock-manage-table'
import InactiveStockManageTable from './_ui/inactive-stock-manage-table'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const StockManage = () => {
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

      // Step 2: 이미지 업로드
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
    <div className={cx('container')}>
      {/* <TradePostButton /> */}
      <ActiveStockManageTable />
      <InactiveStockManageTable />
    </div>
    // <div>
    //   <Button onClick={onClick} variant="filled">
    //     modal
    //   </Button>
    //   {/* <img
    //     src="https://fastcampus-team3.s3.ap-northeast-2.amazonaws.com/strategy/image/07421e08/icons/sampleTrade-icon2.png"
    //     alt="img"
    //   /> */}
    //   <Modal icon={<RegisterIcon />} message="종목 등록" isOpen={isModalOpen}>
    //     <form
    //       onSubmit={onSubmit}
    //       style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
    //     >
    //       <div style={{ display: 'flex', gap: '12px' }}>
    //         종목 : <Input placeholder="종목명을 입력하세요." inputSize="small" />
    //       </div>
    //       <Input type="file" accept="image/*" onChange={handleImageChange} />
    //       {imagePreview && (
    //         <img
    //           src={imagePreview}
    //           alt="Preview"
    //           style={{ maxWidth: '200px', maxHeight: '200px' }}
    //         />
    //       )}
    //       <Button.ButtonGroup gap="24px">
    //         <Button onClick={closeModal} type="button">
    //           취소
    //         </Button>
    //         <Button variant="filled">등록</Button>
    //       </Button.ButtonGroup>
    //     </form>
    //   </Modal>
    //   {/* <VerticalTable
    //     tableHead={['No.', '종목명', '분류', '상태']}
    //     tableBody={[]}
    //     countPerPage={8}
    //     currentPage={1}
    //   />
    //   <Pagination currentPage={1} maxPage={3} onPageChange={() => {}} /> */}
    // </div>
  )
}

export default StockManage
