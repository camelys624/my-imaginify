import { reactive, ref } from 'vue'
import { ElLoading } from 'element-plus'

export function useImageUpload() {
  const form = reactive({
    imageName: ''
  })

  const formRef = ref()
  // const rules = reactive({
  //   title: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
  // })
  const editorRef = ref(null)

  const updateEditorImage = (imageUrl, isOrigin) => {
    if (isOrigin) {
      form.imageName = imageUrl
    }

    editorRef.value.updateImageUrl(imageUrl, isOrigin)
  }

  let loading
  const setLoading = (status = true) => {
    if (status) {
      loading = ElLoading.service({
        lock: true,
        text: '处理中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    } else {
      loading && loading.close()
    }
  }

  const generate = async (cb, maskImg) => {
    if (!form.imageName) return

    setLoading()

    cb({ ...form, maskImg }).then((res) => {
      if (res.code) {
        updateEditorImage(res.data)
      }
      setLoading(false)
    })

    // await formEl.validate((valid, fields) => {
    //   if (valid && form.path) {
    //     cb(form).then((res) => {
    //       console.log(res)
    //     })
    //   } else {
    //     console.log('error submit!', fields)
    //   }
    // })
  }

  const uploadImageUrl = (url) => {
    form.imageName = url
  }

  const handleClear = () => {
    form.imageName = ''
  }

  return {
    form,
    editorRef,
    setLoading,
    formRef,
    generate,
    uploadImageUrl,
    handleClear,
    updateEditorImage
  }
}
