import axios from 'axios'

import { SignupFormDataModel } from '../information/types'

export const signup = async (formData: SignupFormDataModel) => {
  const data = {
    username: formData.name,
    nickname: formData.nickname,
    phone: formData.phone,
    birthdate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
    password: formData.password,
    email: `${formData.email}@${formData.emailDomain}`,
    role: formData.role,
    code: formData.code,
    infoAgreement: formData.infoAgreement,
  }

  try {
    const response = await axios.post('/api/users/signup', data)
    return response.data
  } catch (err) {
    console.error('회원가입 실패:', err)
    throw new Error('회원가입에 실패했습니다.')
  }
}
