const uploadFileWithPresignedUrl = async (presignedUrl: string, file: File) => {
  try {
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`File upload failed: ${err.message}`)
    }
    throw err
  }
}

export default uploadFileWithPresignedUrl
