import { axios } from '@/api'

export const signin = (params) =>
  axios.get('/api/service-account/accounts/authentication', { params })

export const getEmailCode = (params) => axios.get('/api/service-account/accounts/codes', { params })

export const getMenus = (params) => axios.get('/api/service-account/menus', { params })
