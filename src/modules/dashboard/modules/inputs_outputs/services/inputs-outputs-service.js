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

const get = async (id, type) => {
   if (type === 'input') {
      const response = await axiosClient.get(`${routeInput}/${id}`)
      return response.data
   } else {
      const response = await axiosClient.get(`${routeOutput}/${id}`)
      return response.data
   }
}

const save = async (inputOutput, type) => {
   // Entradas
   if (type === 'input') {
      if (inputOutput.id) {
         return await axiosClient.put(`${routeInput}/${inputOutput.id}/`, inputOutput)
      } else {
         return await axiosClient.post(`${routeInput}/`, inputOutput)
      }
   // Saídas
   } else {
      if (inputOutput.id) {
         return await axiosClient.put(`${routeOutput}/${inputOutput.id}/`, inputOutput)
      } else {
         return await axiosClient.post(`${routeOutput}/`, inputOutput)
      }
   }
}

export default {
   index,
   get,
   save
}
