import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('auth', () => {
  const user = ref({})
  const token = ref('')

  function setAuth(user, token) {
    user.value = user
    token.value = token

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  return { user, token, setAuth}
})
