'use client'

import { CSSProperties, useState } from 'react'

import Image, { StaticImageData } from 'next/image'

import { ProfileIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type AvatarSizeType = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

interface Props {
  src?: string | StaticImageData
  size?: AvatarSizeType
  avatarStyle?: CSSProperties
}

const Avatar = ({ src, size = 'small', avatarStyle }: Props) => {
  const [isValidImage, setIsValidImage] = useState(true)

  return (
    <div className={cx('avatar', size, avatarStyle)}>
      {src && isValidImage ? (
        <Image src={src} alt="프로필" fill onError={() => setIsValidImage(false)} />
      ) : (
        <ProfileIcon />
      )}
    </div>
  )
}

export default Avatar
