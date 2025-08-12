'use client'

import React from 'react'

import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  isErr: boolean
  isMyStrategy?: boolean
  onCloseModal: () => void
  onChange?: () => void
}

const ReviewGuideModal = ({ isModalOpen, isErr, isMyStrategy, onCloseModal, onChange }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>
        {isMyStrategy ? (
          <>
            나의 전략엔 리뷰를 <br /> 등록 할 수 없습니다.
          </>
        ) : isErr ? (
          <>
            이미 등록된 리뷰가 있습니다. <br /> 리뷰는 한 번만 등록 가능합니다.
          </>
        ) : (
          <>리뷰를 삭제하시겠습니까?</>
        )}
      </span>
      {isErr && !onChange ? (
        <Button onClick={onCloseModal}>닫기</Button>
      ) : (
        <div className={cx('two-button')}>
          <Button onClick={onCloseModal}>아니오</Button>
          <Button onClick={onChange} variant="filled" className={cx('button')}>
            예
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default ReviewGuideModal
