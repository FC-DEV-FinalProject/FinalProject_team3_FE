import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  onDelete: () => void
  isPending: boolean
}

const DailyAnalysisDeleteAllModal = ({ isModalOpen, onCloseModal, onDelete, isPending }: Props) => {
  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>모든 일간 분석을 삭제하시겠습니까?</span>
      <div className={cx('two-button')}>
        <Button onClick={onCloseModal} disabled={isPending}>
          아니오
        </Button>
        <Button onClick={onDelete} variant="filled" className={cx('button')} disabled={isPending}>
          예
        </Button>
      </div>
    </Modal>
  )
}

export default DailyAnalysisDeleteAllModal
