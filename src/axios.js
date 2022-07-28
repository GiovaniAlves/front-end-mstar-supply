import axios from 'axios'

const axiosClient = axios.create({
   baseUrl: process.env.VUE_APP_API_URL
})

axiosClient.interceptors.request.use(config => {
   config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
   return config
})

export default axiosClient
