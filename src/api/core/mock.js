import { axios } from '@/api'

export const saveMenus = (params) => axios.post('/api/service-account/tests/menus', params)

export const removeMenus = (ids) => axios.delete(`/api/service-account/tests/menus/${ids}`)

export const findAll = (params) => axios.get('/api/service-product/planBoard/planBoard', { params })
