<template>
  <div class="editor-container">
    <div v-show="hasUploaded" class="preview-box">
      <div class="image-wrapper">
        <img id="editorImg" :src="imageUrl" alt="preview" />
        <canvas
          v-if="props.showDrawer"
          ref="maskCanvas"
          style="position: absolute; opacity: 0.5"
        ></canvas>
      </div>
      <div class="editor-tool">
        <el-slider v-model="brushSize" :min="1" :max="50" />
        <el-tooltip class="box-item" effect="dark" content="Clear" placement="bottom">
          <el-button :icon="Delete" circle @click="handleClear" />
        </el-tooltip>
      </div>
    </div>
    <el-upload v-show="!hasUploaded" :http-request="customUpload" class="upload-demo" drag multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
  </div>
</template>

<script setup>
import { UploadFilled, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import Drawer from '@/utils/drawLine'
import { defineExpose } from 'vue'; 
import { uploadImg } from '@/api'
const FORMET_URL='http://sb9lsai7u.hn-bkt.clouddn.com/';
const UPDATE_URL='http://sb9lj8m6v.hn-bkt.clouddn.com/';
const props = defineProps({
  showDrawer: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['imgUploaded', 'clear'])

const brushSize = ref(10)
const imageUrl = ref('')

const maskCanvas = ref(null)

const hasUploaded = ref(false)

onMounted(() => {
  if (!props.showDrawer) return

  const canvas = maskCanvas.value
  const img = document.getElementById('editorImg')
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
  }

  const drawer = new Drawer(canvas.getContext('2d'))

  canvas.addEventListener('mousedown', (e) => {
    drawer.beginDraw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })

  canvas.addEventListener('mousemove', (e) => {
    drawer.drawing(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })

  canvas.addEventListener('mouseup', () => {
    drawer.endDraw()
  })
})

const customUpload = ({ file }) => {
  const form = new FormData()
  form.append('file', file)
  form.append('filename', file.name)

  uploadImg(form).then((res) => {
    if (res.code) {
      imageUrl.value =FORMET_URL + res.data
      hasUploaded.value = true

      emit('imgUploaded', res.data)
    }
  })
}

const handleClear = () => {
  if (props.showDrawer) {
    const canvas = maskCanvas.value
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  hasUploaded.value = false
  imageUrl.value = ''

  emit('clear')
}

// eslint-disable-next-line no-unused-vars
const uploadImageUrl = (url) => {
  console.log(url)
  imageUrl.value =UPDATE_URL + url
}
defineExpose({uploadImageUrl})
</script>

<style scoped>
.editor-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  user-select: none;
}

.preview-box {
  width: 100%;
  height: 100%;
  /* background-color: white; */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  background-position: top;
}

.preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
}

.image-wrapper {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  justify-content: center;
}

.editor-tool {
  height: 40px;
  width: 300px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
