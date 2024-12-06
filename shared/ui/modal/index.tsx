'use client'

import classNames from 'classnames/bind'
import { createPortal } from 'react-dom'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface Props {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  message?: string
  children?: React.ReactNode
  isOpen: boolean
  className?: string
  size?: 'default' | 'big'
}

const Modal = ({
  icon: Icon,
  message,
  children,
  isOpen = false,
  size = 'default',
  className,
}: Props) => {
  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root')

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <>
      <div className={cx('overlay')}></div>
      <div className={cx('modal', size, className)}>
        <div className={cx('icon')}>{Icon && <Icon className={cx('icon')} />}</div>
        <p className={cx('message')}>{message}</p>
        {children}
      </div>
    </>,
    modalRoot
  )
}

export default Modal
