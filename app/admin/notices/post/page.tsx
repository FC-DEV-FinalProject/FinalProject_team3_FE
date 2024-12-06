'use client'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import BackHeader from '@/shared/ui/header/back-header'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import Title from '@/shared/ui/title'

import FileInput from '../../_ui/file-input'
import InputField from '../../_ui/input-field'
import useNoticeForm from './_hooks/use-notice-form'
import usePostNotice from './_hooks/use-notice-post'
import styles from './page.module.scss'

const cx = classNames.bind(styles)

const AdminNoticePostPage = () => {
  const { formData, onInputChange } = useNoticeForm()
  const { mutate: postNotice } = usePostNotice(formData)

  return (
    <>
      <BackHeader label="공지사항으로 돌아가기" />
      <Title label="공지사항 등록" style={{ margin: '0 0 26px 12.6px' }} />
      <div className={cx('container')}>
        <form
          className={cx('form')}
          onSubmit={(e) => {
            e.preventDefault()
            postNotice()
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
                  className={cx('textarea')}
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
                  onChange={(e) => onInputChange('files', Array.from(e.target.files || []))}
                />
              }
            />
          </div>
          <Button size="small" type="submit" variant="filled">
            공지 등록하기
          </Button>
        </form>
      </div>
    </>
  )
}

export default AdminNoticePostPage
