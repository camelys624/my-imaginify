import apiConfig from './apiConfig'

export default function customFetch(url, options = {}, useDefault) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    'mode': 'no-cors'
  }

  if (token) {
    options.headers={
      Authorization: token
    }
  }

  return fetch(`${apiConfig.API_URL}/${url}`, {
    ...options,
    headers: useDefault
      ? { ...options.headers }
      : {
          ...headers,
          ...options.headers
        }
  }).then((res) => {
    if (res.status === 401||res.status=== 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.open('/login', '_self')
    }

    return res.json()
  })
}
