<script setup>
import ImageEditor from '@/components/ImageEditor.vue'
import { useImageUpload } from '@/composables/imageUpload'
import { objRmove } from '@/api'

const { editorRef, generate, uploadImageUrl, handleClear } = useImageUpload()
</script>

<template>
  <div class="page-container">
    <ImageEditor
      ref="editorRef"
      show-drawer
      @imgUploaded="uploadImageUrl"
      @clear="handleClear"
      @generate="generate(objRmove)"
    />
    <!-- <el-form
      :model="form"
      ref="formRef"
      label-width="80px"
      label-position="top"
      class="custom-el-form"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%; background: var(--system-bg); border: none"
          @click="generate(formRef, restoreImg)"
          >Generate</el-button
        >
      </el-form-item>
    </el-form> -->
  </div>
</template>
