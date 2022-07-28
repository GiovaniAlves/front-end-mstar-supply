import axiosClient from '@/axios'

const routeInput = 'http://127.0.0.1:8000/inputs'
const routeOutput = 'http://127.0.0.1:8000/outputs'

const index = async (type) => {
   if (type === 'inputs') {
      const response = await axiosClient.get(`${routeInput}`)
      return response.data
   } else {
      const response = await axiosClient.get(`${routeOutput}`)
      return response.data
   }
}

export default {
   index
}
