import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isCollapse: false // 左侧菜单是否折叠
  }),
  getters: {},
  actions: {}
})
