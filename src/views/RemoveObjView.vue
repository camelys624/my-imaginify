<script setup>
import ImageEditor from '@/components/ImageEditor.vue'
import { useImageUpload } from '@/composables/imageUpload'
import { objRmove } from '@/api'
import ImageHistory from '@/components/ImageHistory.vue'

const { editorRef, generate, uploadImageUrl, handleClear, updateEditorImage } = useImageUpload()
</script>

<template>
  <div class="page-container">
    <ImageHistory function="2" @updateEditImage="updateEditorImage" />
    <ImageEditor
      ref="editorRef"
      function="2"
      show-drawer
      @imgUploaded="uploadImageUrl"
      @clear="handleClear"
      @generate="(imgUrl) => generate(objRmove, imgUrl)"
    />
  </div>
</template>
