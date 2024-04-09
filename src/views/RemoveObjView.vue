<script setup>
import ImageEditor from '@/components/ImageEditor.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  title: ''
})

const formRef = ref()

const generate = () => {
  console.log('Generate')
}
</script>

<template>
  <div class="page-container">
    <ImageEditor />
    <el-form :model="form" ref="formRef" label-width="80px" label-position="top" class="custom-el-form">
      <el-form-item label="Title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%; background: var(--system-bg); border: none;"
          @click="generate">Generate</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>