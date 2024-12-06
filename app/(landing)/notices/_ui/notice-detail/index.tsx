'use client'

import { DownloadIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import axios from '@/shared/api/axios'

import useNoticeDetail from '../../_hooks/use-notice-detail'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const { data: notice, isLoading } = useNoticeDetail(noticeId)

  const handleSave = async (fileName: string, noticeFileId: number) => {
    try {
      const response = await axios.get(`/api/files/download/${noticeFileId}`, {
        responseType: 'blob',
      })

      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error)
    }
  }

  return (
    <div className={cx('container')}>
      <div className={cx('title-wrapper')}>
        <div className={cx('title')}>{notice?.title}</div>
        <div className={cx('date')}>{notice?.createdAt}</div>
      </div>
      <div className={cx('top-line')}></div>
      <div className={cx('content')}>{notice?.content}</div>
      <div className={cx('bottom-line')}></div>

      <div className={cx('attach-file')}>
        <div className={cx('file-left-wrapper')}>
          <p className={cx('file-count')}>첨부 {notice?.files.length}개</p>
        </div>
        <div className={cx('file-right-wrapper')}>
          {notice?.files.map((file, index) => (
            <div className={cx('file-wrapper')} key={index}>
              <div
                className={cx('file-title')}
                onClick={() => handleSave(file.fileName, file.noticeFileId)}
              >
                {file.fileName}
              </div>
              <DownloadIcon className={cx('file-download')} onClick={() => handleSave} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticeDetail
