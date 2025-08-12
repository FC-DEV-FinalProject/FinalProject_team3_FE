const uploadFilesWithPresignedUrl = async (files: File[], presignedUrls: string[]) => {
  try {
    await Promise.all(
      files.map((file, idx) => {
        if (presignedUrls[idx]) {
          return fetch(presignedUrls[idx], {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          })
        } else {
          throw new Error(`Presigned URL이 인덱스 ${idx}에 대해 없습니다.`)
        }
      })
    )
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`File upload failed: ${err.message}`)
    }
    throw err
  }
}

export default uploadFilesWithPresignedUrl
