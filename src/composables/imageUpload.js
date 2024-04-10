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

  const generate = async (cb) => {
    console.log(form.imageName)
    if (!form.imageName) return

    const loading = ElLoading.service({
      lock: true,
      text: '处理中',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    cb(form).then((res) => {
      console.log(res)
      if (res.code) {
        editorRef.value.updateImageUrl(res.data)
      }
      loading.close()
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
