import Pagination from '@/shared/ui/pagination'
import VerticalTable from '@/shared/ui/table/vertical'

const TradeManage = () => {
  return (
    <div>
      <VerticalTable
        tableHead={['No.', '종목명', '분류', '상태']}
        tableBody={[]}
        countPerPage={8}
        currentPage={1}
      />
      <Pagination currentPage={1} maxPage={3} onPageChange={() => {}} />
    </div>
  )
}

export default TradeManage
