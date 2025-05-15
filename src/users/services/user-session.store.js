import { ref } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)

export function useUserSession() {
  function setUser(user) {
    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  function clearUser() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  return {
    currentUser,
    setUser,
    clearUser
  }
}
