<template>
  <div class="editor-container">
    <div class="preview-box" style="display: none;">
      <img src="" alt="preview" />
      <canvas ref="maskCanvas"></canvas>
    </div>
    <el-upload class="upload-demo" drag multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </div>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
</script>

<style scoped>
.editor-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>