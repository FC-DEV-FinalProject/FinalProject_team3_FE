import axios from 'axios'

export const checkNicknameDuplicate = async (nickname: string) => {
  try {
    const response = await axios.get(`/api/users/check/nickname?nickname=${nickname}`)
    return response.data
  } catch (err) {
    console.error(err)
    throw new Error('닉네임 중복 확인에 실패했습니다.')
  }
}

export const checkPhoneDuplicate = async (phone: string) => {
  try {
    const response = await axios.get(`/api/users/check/phone?phone=${phone}`)
    return response.data
  } catch (err) {
    console.error(err)
    throw new Error('휴대폰 전화 중복 확인에 실패했습니다.')
  }
}

export const checkEmailDuplicate = async (email: string, domain: string) => {
  const emailAddress = `${email}@${domain}`

  try {
    const response = await axios.get(`/api/users/check/email?email=${emailAddress}`)
    return response.data
  } catch (err) {
    console.error(err)
    throw new Error('이메일 중복 확인에 실패했습니다.')
  }
}
