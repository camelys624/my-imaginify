<template>
  <div class="editor-container">
    <div v-show="hasUploaded" class="preview-box">
      <div class="image-wrapper">
        <img id="editorImg" src="@/assets/login.jpg" alt="preview" />
        <canvas v-if="props.showDrawer" ref="maskCanvas" style="position: absolute; opacity: 0.5"></canvas>
      </div>
      <div class="editor-tool">
        <el-slider v-model="brushSize" :min="1" :max="50" style="margin-right: 12px;" />
        <el-button type="primary" style="background: var(--system-bg); border: none;border-radius: 16px;"
          @click="generate">处理图像</el-button>
        <el-tooltip class="box-item" effect="dark" content="对比" placement="top">
          <el-button :icon="IconComparison" :disabled="!hasGenerated" circle @click="handleComparison" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="清除" placement="top">
          <el-button :icon="Delete" circle @click="handleClear" />
        </el-tooltip>
      </div>
    </div>
    <el-upload v-show="!hasUploaded" :http-request="customUpload" class="upload-demo" drag multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
    <image-comparison v-show="comparisonVisible" :position-props="comparisonProps"/>
  </div>
</template>

<script setup>
import { UploadFilled, Delete } from '@element-plus/icons-vue'
import IconComparison from '@/components/icons/IconComparison.vue'
import ImageComparison from '@/components/ImageComparison.vue'
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import Drawer from '@/utils/drawLine'
import { defineExpose } from 'vue';
import { uploadImg } from '@/api'

const FORMET_URL = 'http://sb9lsai7u.hn-bkt.clouddn.com/';
const UPDATE_URL = 'http://sb9lj8m6v.hn-bkt.clouddn.com/';

const props = defineProps({
  showDrawer: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['clear', 'generate'])

const brushSize = ref(10)
const imageUrl = ref('')
const maskCanvas = ref(null)
const hasUploaded = ref(false)
const hasGenerated = ref(false)
const comparisonVisible = ref(false)
const comparisonProps = reactive({
  left: 0,
  top: 0,
  height: 0,
  width: 0,
  maxWidth: 0
})
const comparisonImg = ref('')

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
      imageUrl.value = FORMET_URL + res.data
      hasUploaded.value = true
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
  hasGenerated.value = false
  imageUrl.value = ''

  emit('clear')
}

const handleComparison = () => {
  const img = document.getElementById('editorImg')
  const { left, top, width, height } = img.getBoundingClientRect()

  comparisonProps.left = left
  comparisonProps.top = top
  comparisonProps.width = width / 2
  comparisonProps.height = height
  comparisonProps.maxWidth = width

  comparisonVisible.value = !comparisonVisible.value
}

const generate = () => {
  emit('generate', imageUrl.value)
}

const updateImageUrl = (url) => {
  comparisonImg.value = imageUrl.value
  imageUrl.value = UPDATE_URL + url
  
  hasGenerated.value = true
}

defineExpose({ updateImageUrl })
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
  width: 400px;
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
