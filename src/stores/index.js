import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isAuthenticated: (state) => !!state.token,
  }, 
  actions: {
    async login (email, password) {
      try {
        const response = await axios.get('https://673147677aaf2a9aff104361.mockapi.io/api/users')
        const user = response.data.find(u => u.email === email && u.pass === password);

        if (user) {
          this.token = user.token
          this.user = user
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', JSON.stringify(user.token))
        } else { 
          console.log('Usuario no encontrado')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})