import 'normalize.css'
import '@/styles/tailwind.css'
import '@/assets/iconfont/iconfont.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import '@/styles/global.scss'
import '@/styles/base.scss'
import { createApp } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import pinia from '@/store'
import App from '@/App.vue'

const app = createApp(App)

// 全局挂载
app.provide('message', ElMessage)

app.use(router)
app.use(pinia)
app.mount('#app')
