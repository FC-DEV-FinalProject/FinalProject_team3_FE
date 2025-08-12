import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/shared/constants/query-key'

import { getNoticeDetail } from '../_api/get-notice-detail'

const useNoticeDetail = (noticeId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTICE_DETAIL, noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  })
}

export default useNoticeDetail
