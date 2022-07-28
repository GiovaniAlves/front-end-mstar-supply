import axiosClient from '@/axios'

const route = 'http://127.0.0.1:8000/goods'

const index = async () => {
   const response = await axiosClient.get(`${route}`)
   return response.data
}

const get = async (id) => {
   const response = await axiosClient.get(`${route}/${id}`)
   return response.data
}

const save = async (merchandise) => {
   if (merchandise.id) {
      return await axiosClient.put(`${route}/${merchandise.id}/`, merchandise)
   } else {
      return await axiosClient.post(`${route}/`, merchandise)
   }
}

export default {
   index,
   get,
   save
}
