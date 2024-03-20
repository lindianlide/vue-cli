import axios from 'axios'

import { notification } from 'ant-design-vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { logout, getErrorData } from '@/utils'

const isExclusive = (url) => {
  const exclusiveRequests = [
    '/self-logging/trackers',
    '/self-logging/requests',
    '/self-logging/visits'
  ]
  return exclusiveRequests.some((x) => url.indexOf(x) >= 0)
}

//request interceptor
axios.interceptors.request.use(
  (config) => {
    if (!isExclusive(config.url)) {
      config.metadata = { ...config.metadata, startTime: new Date() }
      NProgress.start()
      // store.commit("setSpinning", true);
    }
    const token = window.localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    NProgress.done()
    // store.commit("setSpinning", false);
    return Promise.reject(error)
  }
)

//response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    NProgress.done()
    // store.commit("setSpinning", false);
    if (process.env.NODE_ENV === 'production' && !isExclusive(response.config.url)) {
      response.config.metadata.endTime = new Date()
      response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    }
    return response
  },
  async (error) => {
    if (!isExclusive(error.config.url)) {
      error.config.metadata.endTime = new Date()
      error.duration = error.config.metadata.endTime - error.config.metadata.startTime
      let errorMessage = { message: '异常', description: '' }
      let localHttpStatus = httpStatus
      if (window.localStorage.lang == 'en_US') {
        errorMessage.message = 'Error'
        localHttpStatus = httpStatusEn
      }
      // Do something with response error
      if (error.response) {
        switch (error.response.status) {
          case 401:
            logout()
            break
          case 500:
            if (error.response.data) {
              const errorData = await getErrorData(error.response.data)
              if (errorData) {
                const { exception, message } = errorData
                errorMessage = {
                  ...errorMessage,
                  description: localHttpStatus[error.response.status]
                }
              }
            }
            notification.error({
              ...errorMessage,
              key: `${errorMessage.message} - ${errorMessage.description}`
            })
            break
          default:
            errorMessage = {
              ...errorMessage,
              description: localHttpStatus[error.response.status]
            }
            notification.error({
              ...errorMessage,
              key: `${errorMessage.message} - ${errorMessage.description}`
            })
        }
      }
    }
    NProgress.done()
    // store.commit("setSpinning", false);
    return Promise.reject(error)
  }
)

export { axios }

//response status
const httpStatus = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
}

const httpStatusEn = {
  200: 'OK',
  201: 'Created',
}

//request url
const base = '/api'
const projectCommon = `${base}/self-common`

const accountBase = `${base}/self-account`
const projectBase = `${base}/self-epcx`
// const productBase = '/mock';
export { base, projectCommon, projectBase, accountBase }
