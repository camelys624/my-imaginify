import customFetch from './customFetch'

export const getImageListApi = () => {
  // get
  return customFetch('user/imageList')
}

export const addUser = (args) => {
  return customFetch('user/addUser', {
    method: 'post',
    body: JSON.stringify(args)
  })
}

export const uploadImg = (form) => {
  return customFetch(
    'image/formetImage',
    {
      method: 'post',
      body: form
    },
    true
  )
}

export const restoreImg = (args) => {
  return customFetch('image/updateImage', {
    method: 'post',
    body: JSON.stringify(args)
  })
}
export const bgRmove = (args) => {
  return customFetch('image/backgroundImage', {
    method: 'post',
    body: JSON.stringify(args)
  })

}

export const objRmove = (args) => {
  return customFetch('image/ObjectRemoveImage', {
    method: 'post',
    body: JSON.stringify(args)
  })
}
