'use client'

import NoticeDetail from '../../_ui/notice-detail'

const NoticeDetailPage = ({ params }: { params: { noticeId: string } }) => {
  const noticeId = parseInt(params.noticeId)
  return <NoticeDetail noticeId={noticeId} />
}

export default NoticeDetailPage
