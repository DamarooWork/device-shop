import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const createType = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'ADMIN',
  })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}
export const fetchTypes = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}
export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}
