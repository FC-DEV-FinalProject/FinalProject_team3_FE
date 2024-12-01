'use client'

import FileInput from '@/app/admin/strategies/_ui/shared/file-input'
import { RegisterIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import useModal from '@/shared/hooks/custom/use-modal'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import Modal from '@/shared/ui/modal'

import useStrategyIconPost from '../../_hooks/use-strategy-icon-post'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TradePostButton = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const onPostButtonClick = () => openModal()
  const { onFormSubmit, imagePreview, onImageInputChange, onTypeNameInputChange, isSubmitable } =
    useStrategyIconPost()

  return (
    <>
      <Button
        onClick={onPostButtonClick}
        variant="filled"
        size="small"
        className={cx('post-button')}
      >
        매매 유형 등록하기
      </Button>
      <Modal icon={<RegisterIcon />} message="매매유형 등록" isOpen={isModalOpen}>
        <form onSubmit={onFormSubmit} className={cx('form')}>
          <div className={cx('input-container')}>
            <div className={cx('input-field')}>
              유형
              <Input
                placeholder="유형을 입력해주세요."
                className={cx('input')}
                onChange={onTypeNameInputChange}
              />
            </div>
            <div className={cx('input-field')}>
              아이콘
              <FileInput preview={imagePreview} accept="image/*" onChange={onImageInputChange} />
            </div>
          </div>
          <div className={cx('button-group')}>
            <Button onClick={closeModal} type="button" className={cx('button')}>
              취소
            </Button>
            <Button disabled={!isSubmitable} variant="filled" className={cx('button')}>
              등록
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default TradePostButton