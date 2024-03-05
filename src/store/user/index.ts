import { defineStore } from 'pinia'

export const userStore = defineStore('USER', {
  state: () => ({
    isLogin: false,
  }),
})
