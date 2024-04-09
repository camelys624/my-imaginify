import { reactive, ref } from 'vue'

export function useImageUpload() {
  const form = reactive({
    title: '',
    path: ''
  })

  const formRef = ref()
  const rules = reactive({
    title: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
  })

  const generate = async (formEl) => {
    if (!formEl) return

    await formEl.validate((valid, fields) => {
      if (valid && form.path) {
        console.log('Generate')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const uploadImageUrl = (url) => {
    form.path = url
  }

  const handleClear = () => {
    form.path = ''
  }

  return {
    form,
    rules,
    formRef,
    generate,
    uploadImageUrl,
    handleClear
  }
}
