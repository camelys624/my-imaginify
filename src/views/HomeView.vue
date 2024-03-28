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
        <el-button @click="generate">Generate</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 5px;
}

.custom-el-form {
  width: 320px;
  height: 100%;
  padding: 10px;
  background-color: white;
}
</style>
