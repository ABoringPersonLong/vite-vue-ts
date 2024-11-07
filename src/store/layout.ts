import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isCollapse: false, // 左侧菜单是否折叠
    isDarkTheme: true // 是否是黑色主题
  }),
  getters: {
    // 主题的背景色
    backgroundColor: state => state.isDarkTheme ? '#0d1117' : '#fff',
    // 主题的文本色
    color: state => state.isDarkTheme ? '#fff' : '#000',
    // daisyUI 的主题
    daisyUITheme: state => state.isDarkTheme ? 'dark' : 'emerald',
    // echarts 的主题
    echartsTheme: state => state.isDarkTheme ? 'chalk' : 'vintage'
  },
  actions: {}
})
