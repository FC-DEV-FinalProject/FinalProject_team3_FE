'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import BackHeader from '@/shared/ui/header/back-header'
import Input from '@/shared/ui/input'
import NotificationModal from '@/shared/ui/modal/notification-modal'
import Textarea from '@/shared/ui/textarea'
import Title from '@/shared/ui/title'

import FileInput from '../../_ui/file-input'
import InputField from '../../_ui/input-field'
import useFileHandler from '../_hook/use-file-handler'
import NoticeFileItem from '../_ui/notice-file-item'
import usePostNotice from './_hooks/query/use-post-notice'
import useNoticeForm from './_hooks/use-notice-form'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const AdminNoticePostPage = () => {
  const { formData, onInputChange, setFormData } = useNoticeForm()
  const { mutate: postNotice, isPending } = usePostNotice()
  const { handleDeleteFile, handleFileChange, isModalOpen, handleCloseModal } = useFileHandler({
    formData,
    onInputChange,
    setFormData,
  })

  return (
    <>
      <BackHeader label="공지사항으로 돌아가기" />
      <Title label="공지사항 등록" style={{ margin: '0 0 26px 12.6px' }} />
      <div className={cx('container')}>
        <form
          className={cx('form')}
          onSubmit={(e) => {
            e.preventDefault()
            postNotice(formData)
          }}
        >
          <div className={cx('input-field')}>
            <InputField
              label="제목"
              Input={
                <Input
                  type="text"
                  inputSize="full"
                  placeholder="제목을 입력하세요."
                  value={formData.title}
                  onChange={(e) => onInputChange('title', e.target.value)}
                />
              }
            />
            <InputField
              label="내용"
              Input={
                <Textarea
                  className={cx('content')}
                  placeholder="내용을 입력하세요."
                  value={formData.content}
                  onChange={(e) => onInputChange('content', e.target.value)}
                />
              }
            />
            <InputField
              label="파일첨부"
              Input={
                <FileInput
                  className={cx('file-input')}
                  onChange={handleFileChange}
                  multiple
                  accept=".jpg,.jpeg,.png,.doc,.docx,.pptx,.ppt"
                />
              }
            />
            {formData.newFiles && formData.newFiles.length > 0 && (
              <ul className={cx('notice-file-list')}>
                {formData.newFiles.map((file) => (
                  <NoticeFileItem
                    key={file.name}
                    id={file.name}
                    name={file.name}
                    onDeleteFile={handleDeleteFile}
                  />
                ))}
              </ul>
            )}
          </div>

          <Button disabled={isPending} size="small" type="submit" variant="filled">
            공지 등록하기
          </Button>
        </form>

        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          message="이미 추가된 파일입니다."
        />
      </div>
    </>
  )
}

export default AdminNoticePostPage
