import customFetch from '@/api/customFetch'

export const loginApi = (args) => {
  return customFetch(`login`, {
    method: 'post',
    body: JSON.stringify(args)
  })
}

export const registerApi = (args) => {
  return customFetch('register', {
    method: 'post',
    body: JSON.stringify(args)
  })
}
