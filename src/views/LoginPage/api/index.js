import customFetch from '@/api/customFetch'
function objectToQueryString(obj) {
  const keys = Object.keys(obj)
  const keyValuePairs = keys.map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  })
  return keyValuePairs.join('&')
}

export const loginApi = (args) => {
  return customFetch(`admin/login`, {
    method: 'post',
    body: JSON.stringify(args)
  })
}
