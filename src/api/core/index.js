import { axios, projectCommon, accountBase } from '@/api'

export const getMajors = (params) => axios.get(`${projectCommon}/base/major/dropList`, { params })

export const getProjects = (params) => axios.get(`${projectCommon}/projects/dropList`, { params })

export const getAccounts = (params) => axios.get(`${accountBase}/accounts`, { params })

export const getResources = (params) => axios.get(`${accountBase}/resources`, { params })

//研发专业下拉选择
export const getMajorTechs = () => {
  return axios.get(`${projectCommon}/base/major/tech/dropList`)
}
