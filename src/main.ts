import 'normalize.css'
import '@/assets/iconfont/iconfont.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/tailwind.css'
import 'animate.css'
import '@/styles/base.scss'
import '@/styles/global.scss'
import { createApp } from 'vue'
import router from '@/router'
import pinia from '@/store'
import ElementPlus, { ElMessage } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'
import '../mock'

const app = createApp(App)

// 全局挂载
app.provide('message', ElMessage)

app.use(router)
app.use(pinia)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
