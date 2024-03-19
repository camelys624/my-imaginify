<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-form-wrapper">
        <div class="icon-wrapper">
          <img src="" alt="" />
          <span>Imaginify</span>
        </div>
        <p>一些描述</p>
        <el-form
          ref="loginForm"
          :rules="rules"
          :model="form"
          label-width="auto"
          style="max-width: 500px"
        >
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(loginForm)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="img-wrapper">
        <img src="../assets/login.jpg" alt="login" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const loginForm = ref()

const form = reactive({
  username: '',
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
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #23a6d5, #23d5ab);
}

.login-wrapper {
  height: 500px;
  width: 800px;
  display: flex;
  padding: 10px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.2);
}

.login-form-wrapper {
  flex: 1;
  min-width: 200px;
}

.img-wrapper {
  width: 300px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.img-wrapper img {
  display: block;
  height: 100%;
}
</style>
