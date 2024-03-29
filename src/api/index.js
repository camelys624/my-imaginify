import customFetch from './customFetch'

export const getImageListApi = () => {
  // get
  return customFetch('/user/imageList')
}

export const addUser = (args) => {
  return customFetch('/user/addUser', {
    method: 'post',
    body: JSON.stringify(args)
  })
}
