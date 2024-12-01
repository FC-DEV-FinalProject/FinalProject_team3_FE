import axios from 'axios'

const uploadFileWithPresignedUrl = async (presignedUrl: string, file: File) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}

export default uploadFileWithPresignedUrl
