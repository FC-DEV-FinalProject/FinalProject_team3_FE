import { useState } from 'react'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const StockManage = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const onClick = () => openModal()

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.')
        return
      }

      console.log(file)
      console.log(file.size)

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null) // 파일이 없으면 미리보기 초기화
    }
  }

  const onSubmit = () => {}

  // const [tra]

  const fetchTrade = async () => {
    // const res = await fetch(
    //   'http://15.164.90.102:8081/api/strategies/trade-type?activateState=true'
    // )
    // const res = await fetch('http://15.164.90.102:8081/api/admin/strategies/stock-type', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     stockTypeName: '주식',
    //     stockTypeIconURL: 'StockIconTest.png',
    //     size: 456,
    //     // tradeTypeName: '자동',
    //     // tradeTypeIconURL: 'IconTest.svg',
    //     // size: 456,
    //   }),
    // })
    const res = await fetch(
      'http://15.164.90.102:8081/api/admin/strategies/trade-types/{trade_type_id}',
      {
        method: 'PATCH',
      }
    )

    const result = await res.json()

    console.log(result)
  }

  return (
    <div>
      <Button onClick={fetchTrade} variant="filled">
        fetch
      </Button>
      {/* <img
        src="https://fastcampus-team3.s3.ap-northeast-2.amazonaws.com/strategy/image/07421e08/icons/sampleTrade-icon2.png"
        alt="img"
      /> */}
      {/* <Modal icon={<RegisterIcon />} message="종목 등록" isOpen={isModalOpen}> */}
      <form
        onSubmit={onSubmit}
        style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          종목 : <Input placeholder="종목명을 입력하세요." inputSize="small" />
        </div>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        )}
        <Button.ButtonGroup gap="24px">
          <Button onClick={closeModal}>취소</Button>
          <Button
            onClick={() => {
              alert('123')
            }}
            variant="filled"
          >
            등록
          </Button>
        </Button.ButtonGroup>
      </form>

      {/* </Modal> */}
      {/* <VerticalTable
        tableHead={['No.', '종목명', '분류', '상태']}
        tableBody={[]}
        countPerPage={8}
        currentPage={1}
      />
      <Pagination currentPage={1} maxPage={3} onPageChange={() => {}} /> */}
    </div>
  )
}

export default StockManage
