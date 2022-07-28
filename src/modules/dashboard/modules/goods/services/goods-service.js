import axiosClient from '@/axios'

const route = 'http://127.0.0.1:8000/goods'

const index = async () => {
   const response = await axiosClient.get(`${route}`)
   return response.data
}

export default {
   index
}
