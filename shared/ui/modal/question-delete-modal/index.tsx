import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import Modal from '@/shared/ui/modal'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  onDelete: () => void
  message: string
}

const QuestionDeleteModal = ({ isModalOpen, onCloseModal, onDelete, message }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <p className={cx('message')}>{message}</p>

      <Button.ButtonGroup>
        <Button onClick={onCloseModal}>취소</Button>
        <Button onClick={onDelete} variant="filled">
          삭제
        </Button>
      </Button.ButtonGroup>
    </Modal>
  )
}

export default QuestionDeleteModal
