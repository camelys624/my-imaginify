import { reactive, ref } from 'vue'

export function useImageUpload() {
  const form = reactive({
    imageName: ''
  })

  const formRef = ref()
  // const rules = reactive({
  //   title: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
  // })
  const editorRef = ref(null)

  const generate = async (formEl, cb) => {
    if (!form.imageName) return

    cb(form).then((res) => {
      console.log(res)
      if (res.code) {
        editorRef.value.uploadImageUrl(res.data)
      }
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
    // rules,
    formRef,
    generate,
    uploadImageUrl,
    handleClear
  }
}
