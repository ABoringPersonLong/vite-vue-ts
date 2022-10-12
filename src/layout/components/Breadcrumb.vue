<template>
  <div class="breadcrumb-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()

const breadcrumbList = ref([{ name: '', path: '' }]) // 面包屑导航列表

// 监听器
watch(route, (newVal: any) => { // 监听地址栏发生变化，根据 url 地址设置对应的面包屑导航
  const { path } = newVal
  if (path === '/home') {
    breadcrumbList.value = [
      {
        name: '首页',
        path: ''
      }
    ]
  } if (path === '/user') {
    breadcrumbList.value = [
      {
        name: '首页',
        path: '/home'
      },
      {
        name: '用户管理',
        path: '/user'
      }
    ]
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
</style>
