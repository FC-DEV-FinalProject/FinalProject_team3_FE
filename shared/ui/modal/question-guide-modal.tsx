'use client'

import React from 'react'

import { ModalCheckIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const QuestionGuideModal = ({ isModalOpen, onCloseModal }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalCheckIcon}>
      <span className={cx('message')}>
        문의가 등록되었습니다.
        <br />
        문의 등록 내용 및 답변은
        <br />
        문의 페이지에서 확인 가능합니다.
      </span>
      <Button onClick={onCloseModal}>닫기</Button>
    </Modal>
  )
}

export default QuestionGuideModal
