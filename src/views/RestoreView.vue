<script setup>
import ImageEditor from '@/components/ImageEditor.vue'
import { useImageUpload } from '@/composables/imageUpload'
import { restoreImg } from '@/api'

const { form, formRef, editorRef, generate, uploadImageUrl, handleClear } = useImageUpload()
</script>

<template>
  <div class="page-container">
    <ImageEditor ref="editorRef" @imgUploaded="uploadImageUrl" @clear="handleClear" />
    <el-form
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
    </el-form>
  </div>
</template>
