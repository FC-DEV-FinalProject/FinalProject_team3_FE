import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useUploadAccountImages } from '@/app/(dashboard)/my/_hooks/query/use-upload-account-images'
import { RegisterIcon } from '@/public/icons'
import classNames from 'classnames/bind'

import Modal from '@/shared/ui/modal'

import { Button } from '../../button'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface AnalysisUploadModalProps {
  isOpen: boolean
  onClose: () => void
  strategyId: number
  uploadType: 'excel' | 'direct'
  message: string
}

interface UploadEntryModel {
  title: string
  imageFile: File | null
  imageFileName: string
  isNewInput?: boolean
}

const AccountRegisterModal = ({
  isOpen,
  onClose,
  strategyId,
  message,
}: AnalysisUploadModalProps) => {
  const [entries, setEntries] = useState<UploadEntryModel[]>([
    {
      title: '',
      imageFile: null,
      imageFileName: '',
      isNewInput: true,
    },
  ])
  const [error, setError] = useState<string>('')
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const resetModal = () => {
    setEntries([
      {
        title: '',
        imageFile: null,
        imageFileName: '',
        isNewInput: true,
      },
    ])
    setError('')
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const { mutate: uploadImages, isPending } = useUploadAccountImages({
    strategyId,
    onSuccess: () => {
      handleClose()
    },
    onError: () => {
      setError('이미지 업로드 중 오류가 발생했습니다.')
    },
  })

  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, entries.length)
  }, [entries.length])

  const handleTitleChange = (index: number, value: string) => {
    const entry = entries[index]
    if (entry.isNewInput) {
      const newEntries = [...entries]
      newEntries[index].title = value
      setEntries(newEntries)
    }
  }

  const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const entry = entries[index]
    if (!entry.isNewInput) return

    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('이미지 파일만 업로드 가능합니다.')
        return
      }
      const newEntries = [...entries]
      const currentEntry = newEntries[index]

      currentEntry.imageFile = file
      currentEntry.imageFileName = file.name
      setEntries(newEntries)
      setError('')
    }
  }

  const handleFileClick = (index: number) => {
    const entry = entries[index]
    if (entry.isNewInput) {
      fileInputRefs.current[index]?.click()
    }
  }

  const handleAddEntry = () => {
    const currentNewEntry = entries.find((entry) => entry.isNewInput)
    if (!currentNewEntry?.imageFile) {
      setError('새 이미지를 먼저 업로드해 주세요.')
      return
    }
    if (!currentNewEntry.title.trim()) {
      setError('이미지 제목을 입력해 주세요.')
      return
    }

    if (entries.length < 5) {
      setEntries([
        {
          title: '',
          imageFile: null,
          imageFileName: '',
          isNewInput: true,
        },
        ...entries.map((entry) => ({
          ...entry,
          isNewInput: false,
        })),
      ])
      setError('')
    }
  }

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    setEntries(newEntries)
  }

  const handleSubmit = async () => {
    const nonEmptyEntries = entries.filter((entry) => !entry.isNewInput)
    if (nonEmptyEntries.length === 0) {
      setError('최소 1개 이상의 이미지를 업로드해야 합니다.')
      return
    }

    const uploadData = nonEmptyEntries.map(({ title, imageFile }) => {
      if (!imageFile) throw new Error('이미지 파일이 없습니다.')
      return { title, imageFile }
    })

    uploadImages(uploadData)
  }

  const sortedEntries = [
    ...entries.filter((entry) => entry.isNewInput),
    ...entries.filter((entry) => !entry.isNewInput),
  ]

  return (
    <Modal isOpen={isOpen} size="big" icon={RegisterIcon} message={message}>
      <div className={cx('container')}>
        <div className={cx('upload-container')}>
          {sortedEntries.map((entry, index) => (
            <div key={index} className={cx('form-grid')}>
              {entry.isNewInput ? (
                <>
                  <div className={cx('input-group')}>
                    <label className={cx('label')}>제목</label>
                    <input
                      className={cx('data-input')}
                      value={entry.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      placeholder="제목을 입력해주세요"
                    />
                  </div>

                  <div className={cx('input-group')}>
                    <label className={cx('label')}>이미지</label>
                    <div className={cx('file-input-wrapper')}>
                      <input
                        type="file"
                        ref={(el: HTMLInputElement | null) => {
                          if (fileInputRefs.current) {
                            fileInputRefs.current[index] = el
                          }
                        }}
                        className={cx('hidden-input')}
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e)}
                      />
                      <div className={cx('custom-input')} onClick={() => handleFileClick(index)}>
                        <span className={cx('placeholder')}>
                          {entry.imageFileName || '이미지 찾아보기'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={cx('input-actions')}>
                    {entries.length < 5 && (
                      <Button
                        className={cx('add-button')}
                        variant="filled"
                        onClick={handleAddEntry}
                      >
                        추가
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={cx('input-group-added')}>
                    <input className={cx('data-input')} value={entry.title} disabled />
                  </div>

                  <div className={cx('input-group-added')}>
                    <div className={cx('file-input-wrapper')}>
                      <div className={cx('custom-input')}>
                        <span className={cx('placeholder')}>{entry.imageFileName}</span>
                      </div>
                    </div>
                  </div>

                  <div className={cx('input-actions')}>
                    <Button
                      variant="outline"
                      className={cx('delete-button')}
                      onClick={() => removeEntry(index)}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}

          {error && <p className={cx('error-message')}>{error}</p>}

          <div className={cx('button-group')}>
            <Button variant="outline" onClick={handleClose} disabled={isPending}>
              취소
            </Button>
            <Button variant="filled" onClick={handleSubmit} disabled={isPending}>
              등록
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AccountRegisterModal
