import Image from 'next/image'

import classNames from 'classnames/bind'

import Modal from '.'
import { Button } from '../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

const AccountImageModal = ({ isOpen, title, url, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} message={title} className={cx('medium')}>
      <div className={cx('image')}>
        <Image src={url} alt={'imageData.title'} fill sizes="100%" />
      </div>
      <Button onClick={onClose}>닫기</Button>
    </Modal>
  )
}

export default AccountImageModal
