import axios from 'axios'

export const requestEmailAuthentication = async (email: string, domain: string) => {
  const emailAddress = `${email}@${domain}`

  try {
    const response = await axios.get(`/api/users/authenticate/signup?email=${emailAddress}`)
    return response.data
  } catch (err) {
    console.error(err)
    throw new Error('이메일 인증 코드 발송에 실패했습니다.')
  }
}

export const getEmailAuthenticationResult = async (email: string, domain: string, code: string) => {
  const data = {
    email: `${email}@${domain}`,
    code,
  }

  try {
    const response = await axios.post(`/api/users/authenticate/signup`, data)
    return response.data
  } catch (err) {
    console.error(err)
    throw new Error('이메일 인증 코드 확인에 실패했습니다.')
  }
}
