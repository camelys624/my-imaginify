<template>
  <div class="editor-container">
    <div v-show="hasUploaded" class="preview-box">
      <div class="image-wrapper">
        <img id="editorImg" :src="imageUrl" alt="preview" />
        <canvas
          v-if="props.showDrawer"
          ref="maskCanvas"
          style="position: absolute; opacity: 0.5; cursor: none"
        ></canvas>
        <div v-if="props.showDrawer" ref="customCursor" class="cursor-proxy"></div>
      </div>
      <div class="editor-tool">
        <el-slider
          v-if="props.showDrawer"
          v-model="brushSize"
          :min="1"
          :max="50"
          style="margin-right: 12px"
          @change="handleBrushSizeChange"
        />
        <el-button
          type="primary"
          style="background: var(--system-bg); border: none; border-radius: 16px"
          @click="generate"
          >处理图像</el-button
        >
        <el-tooltip class="box-item" effect="dark" content="对比" placement="top">
          <el-button
            :icon="IconComparison"
            :disabled="!hasGenerated"
            circle
            @click="handleComparison"
          />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="下载" placement="top">
          <el-button :icon="Download" :disabled="!hasGenerated" circle @click="handleDownload" />
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
    <image-comparison
      v-show="comparisonVisible"
      :position-props="comparisonProps"
      :image-url="comparisonImg"
    />
  </div>
</template>

<script setup>
import { UploadFilled, Delete, Download } from '@element-plus/icons-vue'
import IconComparison from '@/components/icons/IconComparison.vue'
import ImageComparison from '@/components/ImageComparison.vue'
import { ref, reactive, onMounted } from 'vue'
import Drawer from '@/utils/drawLine'
import { uploadImg } from '@/api'

const FORMET_URL = 'http://sb9lsai7u.hn-bkt.clouddn.com/'
const UPDATE_URL = 'http://sb9lj8m6v.hn-bkt.clouddn.com/'

const props = defineProps({
  showDrawer: {
    type: Boolean,
    default: false
  },
  function: {
    type: String,
    default: '0'
  }
})
const emit = defineEmits(['imgUploaded', 'clear', 'generate'])

const brushSize = ref(10)
const imageUrl = ref('')
const maskCanvas = ref(null)
const customCursor = ref(null)
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
let drawer = undefined

const initMaskCanvas = () => {
  if (!props.showDrawer || drawer) return

  const canvas = maskCanvas.value
  const img = document.getElementById('editorImg')
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height

    drawer = new Drawer(canvas.getContext('2d'), img.width, img.height)
  }

  canvas.addEventListener('mousedown', (e) => {
    drawer.beginDraw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })

  canvas.addEventListener('mouseenter', (e) => {
    customCursor.value.style.display = 'block'
    customCursor.value.style.left = e.clientX + 'px'
    customCursor.value.style.top = e.clientY + 'px'
  })

  canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX - canvas.offsetLeft
    const y = e.clientY - canvas.offsetTop
    customCursor.value.style.left = e.clientX + 'px'
    customCursor.value.style.top = e.clientY + 'px'
    drawer.drawing(x, y)
  })

  canvas.addEventListener('mouseleave', () => {
    customCursor.value.style.display = 'none'
  })

  canvas.addEventListener('mouseup', () => {
    drawer.endDraw()
  })
}

onMounted(initMaskCanvas)

const customUpload = ({ file }) => {
  const form = new FormData()
  form.append('file', file)
  form.append('filename', file.name)
  form.append('function', props.function)

  uploadImg(form).then((res) => {
    if (res.code) {
      imageUrl.value = FORMET_URL + res.data
      hasUploaded.value = true

      initMaskCanvas()
      emit('imgUploaded', res.data)
    }
  })
}

const handleBrushSizeChange = (value) => {
  if (!drawer) return

  customCursor.value.style.width = value + 'px'
  customCursor.value.style.height = value + 'px'
  drawer.setBrushSize(value)
}

const handleClear = () => {
  if (props.showDrawer) {
    drawer.clear()
  }

  hasUploaded.value = false
  hasGenerated.value = false
  imageUrl.value = ''
  comparisonVisible.value = false

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
  if (props.showDrawer) {
    const { status, message, img } = drawer.exportImage(imageUrl.value)
    if (!status) {
      console.log(message)
    } else {
      drawer.clear()
      emit('generate', img)
    }

    return
  }

  emit('generate')
}

const updateImageUrl = (url) => {
  comparisonImg.value = imageUrl.value
  imageUrl.value = UPDATE_URL + url

  hasGenerated.value = true
}

const handleDownload = () => {
  const link = document.createElement('a')
  link.href = imageUrl.value
  link.download = 'image' + Date.now()
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
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
  max-width: 100%;
  max-height: 100%;
  height: 100%;
}

.preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.image-wrapper {
  width: 100%;
  height: calc(100% - 60px);
  max-height: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
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

.cursor-proxy {
  position: absolute;
  border: 2px solid black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  display: none;
}
</style>
