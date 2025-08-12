'use client'

import axios from 'axios'

export const downloadNoticeFile = async (noticeId: number, noticeFileId: number) => {
  const response = await axios.get(`/api/notice/${noticeId}/files/${noticeFileId}`, {
    responseType: 'blob',
  })
  return response.data
}

export const handleNoticeFileDownload = async (
  fileName: string,
  noticeId: number,
  noticeFileId: number
) => {
  try {
    const blobData = await downloadNoticeFile(noticeId, noticeFileId)

    const blob = new Blob([blobData])
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('파일 다운로드 중 오류 발생:', err)
    throw new Error('파일 다운로드에 실패했습니다.')
  }
}
