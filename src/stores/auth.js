import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('auth', () => {
  const user = ref({})
  const token = ref('')

  function setAuth(newUser, newToken) {
    user.value = newUser
    token.value = newToken

    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', newToken)
  }

  return { user, token, setAuth }
})
