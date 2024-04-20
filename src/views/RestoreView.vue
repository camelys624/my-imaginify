<script setup>
import ImageEditor from '@/components/ImageEditor.vue'
import { useImageUpload } from '@/composables/imageUpload'
import { restoreImg } from '@/api'
import ImageHistory from '@/components/ImageHistory.vue'

const { editorRef, generate, uploadImageUrl, handleClear, updateEditorImage } = useImageUpload()
</script>

<template>
  <div class="page-container">
    <ImageHistory function="1" @updateEditImage="updateEditorImage" />
    <ImageEditor
      ref="editorRef"
      function="1"
      @imgUploaded="uploadImageUrl"
      @clear="handleClear"
      @generate="generate(restoreImg)"
    />
  </div>
</template>
