<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-form-wrapper">
        <IconLogo />
        <p style="margin: 20px 0; text-align: center">
          欢迎来到我们的AI图像处理网站！<br />
          修复、移除对象、更换背景、文本识别一键搞定！
        </p>
        <LoginForm
          v-if="showLogin"
          :username="username"
          @submit="handleLogin"
          @register="toggleForm(false)"
        />
        <RegisterForm v-else @submit="handleRegister" @login="toggleForm(true)" />
      </div>
      <div class="img-wrapper">
        <img src="@/assets/login.jpg" alt="login" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'
import { loginApi, registerApi } from './api/index'
import { useCounterStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import { ref } from 'vue'

localStorage.removeItem('token')

const router = useRouter()

const userStore = useCounterStore()

const showLogin = ref(true)
const username = ref('')

const handleLogin = async (form) => {
  loginApi({ ...form }).then((res) => {
    if (res.code === 1) {
      userStore.setAuth({ username: 'yang' }, res.data.token)
      router.push('/')
    } else {
      ElMessage.error('用户名或密码错误')
    }
  })
}

const handleRegister = (form) => {
  registerApi({ ...form }).then((res) => {
    if (res.code) {
      ElMessage.success('注册完成，请登录')
      username.value = form.username
      toggleForm(true)
    } else {
      ElMessage.error('发生一些错误，请重试')
    }
  })
}

const toggleForm = (status) => {
  showLogin.value = status
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
  /* height: 500px; */
  width: 800px;
  display: flex;
  padding: 10px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.2);
}

.login-form-wrapper {
  flex: 1;
  min-width: 200px;
  padding: 30px 30px 30px 50px;
}

.img-wrapper {
  width: 300px;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;
}

.img-wrapper img {
  display: block;
  height: 100%;
  object-fit: cover;
}
</style>
