export const RES = {
  isSuccess: true,
  message: '공지사항 목록 조회 성공',
  data: {
    content: [
      {
        noticeId: 1,
        user: {
          id: 2,
          nickname: '관리자',
        },
        title: '서비스 점검 안내', //공지사항 제목
        content: '점검예정.', //공지사항 내용
        createdAt: '2024-01-01 12:00:00', // 등록일
        publishedAt: '2024-11-15T09:00:00', //공개일
        createdBy: '관리자', // 등록자
      },
      {
        noticeId: 2,
        user: {
          id: 3,
          nickname: '관리자',
        },
        title: '업데이트 안내',
        content: '이번 업데이트 내용은',
        nickname: '관리자',
        createdAt: '2024-01-02 12:00:00',
        publishedAt: '2024-11-15T09:00:00',
        createdBy: '관리자',
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
    },
    totalPages: 5,
    totalElements: 50,
  },
}
