<template>
  <div class="page-container" style="padding: 20px">
    <ImageHistory function="4" @updateEditImage="updateEditorImage" />
    <div class="image-editor-wrapper">
      <div v-show="hasUploaded" class="image-wrapper">
        <img :src="imageUrl" alt="" srcset="" />
      </div>
      <el-upload
        v-show="!hasUploaded"
        :http-request="customUpload"
        class="upload-demo"
        drag
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      </el-upload>
    </div>
    <el-form
      :model="form"
      ref="formRef"
      label-width="80px"
      label-position="top"
      class="custom-el-form"
    >
      <el-form-item label="内容" prop="title">
        <el-input v-model="content" :autosize="{ minRows: 4 }" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!generated"
          type="primary"
          style="width: 100%; background: var(--system-bg); border: none"
          @click="generate"
          >处理</el-button
        >
        <el-button
          v-else
          type="primary"
          style="width: 100%; background: var(--system-bg); border: none"
          @click="handleCopy"
          >复制</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uploadImg, imgOcr } from '@/api'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElLoading, ElMessage } from 'element-plus'
import ImageHistory from '@/components/ImageHistory.vue'

const imageUrl = ref('')
const hasUploaded = ref(false)
const generated = ref(false)
const content = ref('')
const form = ref(null)
const FORMET_URL = 'http://sb9lsai7u.hn-bkt.clouddn.com/'
let imageName = ''

const customUpload = ({ file }) => {
  const loading = ElLoading.service({
    lock: true,
    text: '处理中',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  const form = new FormData()
  form.append('file', file)
  form.append('filename', file.name)
  form.append('function', '4')

  uploadImg(form).then((res) => {
    if (res.code) {
      imageName = res.data
      imageUrl.value = FORMET_URL + res.data
      hasUploaded.value = true
    }

    ElMessage({
      message: res.code ? '上传成功' : '上传失败',
      grouping: true,
      type: res.code ? 'success' : 'error'
    })

    loading.close()
  })
}

const generate = () => {
  if (!imageName) return ElMessage.error('请先上传图片')
  imgOcr({ imageName }).then((res) => {
    if (res.code) {
      generated.value = true
      content.value = res.data
    }
  })
}

const handleCopy = () => {
  if (!content.value) {
    return
  }

  navigator.clipboard.writeText(content.value).then(() => {
    console.log('copy success')
    ElMessage.success('复制成功')
  })
}

const updateEditorImage = (url) => {
  imageUrl.value = FORMET_URL + url
  imageName = url
  hasUploaded.value = true
}
</script>

<style scoped>
.image-editor-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}
</style>
