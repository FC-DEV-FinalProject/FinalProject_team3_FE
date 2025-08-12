'use client'

import { DownloadIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { handleNoticeFileDownload } from '../../_api/get-notice-file'
import useNoticeDetail from '../../_hooks/use-notice-detail'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const { data: notice } = useNoticeDetail(noticeId)

  const handleSave = (fileName: string, noticeFileId: number) => {
    handleNoticeFileDownload(fileName, noticeId, noticeFileId)
  }

  return (
    <div className={cx('container')}>
      <div className={cx('title-wrapper')}>
        <div className={cx('title')}>{notice?.title}</div>
        <div className={cx('date')}>{notice?.createdAt}</div>
      </div>
      <div className={cx('top-line')}></div>
      <div className={cx('content')}>
        <pre>{notice?.content}</pre>
      </div>
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
              <DownloadIcon
                className={cx('file-download')}
                onClick={() => handleSave(file.fileName, file.noticeFileId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticeDetail
