import axios from 'axios'
const URL = import.meta.env.VITE_API_URL

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
