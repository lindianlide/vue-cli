import router from '@/router'

export const getErrorData = async (data) => {
  if (data.exception) return data
  else if (data instanceof Blob && data.type && data.type.indexOf('application/json') >= 0) {
    return await new Response(data).json()
  } else return null
}

export const logout = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  router.replace({ name: 'login' })
}

export const random = (len = 18) => {
  let arr = [...new Array(62)].map((_, i) =>
    String.fromCharCode(i + (i < 10 ? 0 : i < 36 ? 7 : 13) + 6 * 8)
  )
  return [...new Array(len)].map(() => arr[Math.floor(Math.random() * arr.length)]).join('')
}

export const startsWithSlash = (path) => {
  return !path || path.startsWith('/') ? path : `/${path}`
}
