import { axios } from '@/api'

//文档
export const getDocuments = (params) => axios.get('/api/service-account/documents', { params })

//配置
export const getConfigurations = (params) =>
  axios.get('/api/service-account/configurations', { params })

//文件
export const getFile = (id) => axios.get(`/api/service-file/files/${id}`, { responseType: 'blob' })

export const getDownloadFiles = (params) => axios.get('/api/service-account/files', { params })
