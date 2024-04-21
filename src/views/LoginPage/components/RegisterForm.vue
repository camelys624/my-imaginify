<template>
  <el-form
    ref="registerForm"
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
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width: 100%; background: var(--system-bg); border: none"
        @click="submitForm(registerForm)"
        >注册</el-button
      >
    </el-form-item>
    <el-divider border-style="dashed">已有账号？</el-divider>
    <el-form-item>
      <el-button plain style="width: 100%" @click="handleLogin">立即登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const registerForm = ref()
const emit = defineEmits(['submit', 'login'])

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (form.confirmPassword !== '') {
      if (!registerForm.value) return
      registerForm.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== form.password) {
    callback(new Error('密码不一致!'))
  } else {
    callback()
  }
}

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
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

const handleLogin = () => {
  emit('login')
}
</script>
