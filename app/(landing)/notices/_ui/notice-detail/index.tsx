'use client'

import { DownloadIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import useNoticeDetail from '../../_hooks/use-notice-detail'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const handleSave = () => {}
  const { data: notice, isLoading } = useNoticeDetail(noticeId)

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
          <p className={cx('file-count')}>첨부 {notice?.attachments.length}개</p>
        </div>
        <div className={cx('file-right-wrapper')}>
          {notice?.attachments.map((file, index) => (
            <div className={cx('file-wrapper')} key={index}>
              <div className={cx('file-title')} onClick={handleSave}>
                {file.title}
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
