import axios from 'axios'

const URL = 'http://localhost:3000/'

const $host = axios.create({
  baseURL: URL,
})
const $authHost = axios.create({
  baseURL: URL,
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
