import { useDeleteMyStrategy } from '@/app/(dashboard)/my/_hooks/query/use-delete-my-strategy'
import { ModalAlertIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  strategyId: number
}

const StrategyDeleteModal = ({ isModalOpen, onCloseModal, strategyId }: Props) => {
  const { mutate: deleteStrategy, isPending } = useDeleteMyStrategy()

  const handleDelete = () => {
    deleteStrategy(strategyId)
    onCloseModal()
  }

  return (
    <Modal isOpen={isModalOpen} icon={ModalAlertIcon}>
      <span className={cx('message')}>해당 전략을 삭제하시겠습니까?</span>
      <div className={cx('two-button')}>
        <Button onClick={onCloseModal} disabled={isPending}>
          아니오
        </Button>
        <Button
          onClick={handleDelete}
          variant="filled"
          className={cx('button')}
          disabled={isPending}
        >
          예
        </Button>
      </div>
    </Modal>
  )
}

export default StrategyDeleteModal
