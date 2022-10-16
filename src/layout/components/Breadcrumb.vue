<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()

// 定义类型
interface Breadcrumb {
  name: string
  path: string
}

// 响应式状态
const breadcrumbList: Ref<Breadcrumb[]> = ref([]) // 面包屑导航列表

// 监听器
watch(route, newVal => { // 监听地址栏发生变化，根据 url 地址设置对应的面包屑导航
  const { path } = newVal
  if (path === '/home') {
    breadcrumbList.value = [
      {
        name: '首页',
        path: ''
      }
    ]
  } if (path === '/users') {
    breadcrumbList.value = [
      {
        name: '首页',
        path: '/home'
      },
      {
        name: '系统管理',
        path: ''
      },
      {
        name: '用户管理',
        path: ''
      }
    ]
  }
}, { immediate: true })
</script>
