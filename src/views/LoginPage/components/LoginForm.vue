<template>
  <el-form
    ref="loginForm"
    :rules="rules"
    :model="form"
    label-width="auto"
    label-position="top"
    style="max-width: 500px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" autocomplete="off" />
      <!-- <el-link type="primary" style="position: absolute; bottom: 0;">忘记密码</el-link> -->
    </el-form-item>
    <el-form-item>
      <el-link :underline="false" type="primary" style="position: absolute; right: 0"
        >忘记密码</el-link
      >
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width: 100%; background: var(--system-bg); border: none"
        @click="submitForm(loginForm)"
        >登录</el-button
      >
    </el-form-item>
    <el-divider border-style="dashed">还没有账号？</el-divider>
    <el-form-item>
      <el-button plain style="width: 100%" @click="handleRegister">立即注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
const emit = defineEmits(['submit', 'register'])
const props = defineProps({
  username: {
    type: String,
    default: ''
  }
})

const loginForm = ref()

const form = reactive({
  username: props.username,
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('submit', form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleRegister = () => {
  emit('register')
}
</script>
