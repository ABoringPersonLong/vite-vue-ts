<template>
  <div class="sidebar-container">
    <el-menu
      class="el-menu-vertical-demo border-0"
      background-color="#21252b"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      router
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activePath"
    >
      <el-menu-item v-for="item in menuList" :key="item.id" :index="item.path">
        <el-icon><Menu /></el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'

const route = useRoute()
const layoutStore = useLayoutStore()
const { isCollapse } = storeToRefs(layoutStore)

const menuList = ref([ // 菜单列表
  {
    id: 1,
    name: '首页',
    path: '/home'
  },
  {
    id: 2,
    name: '用户管理',
    path: '/user'
  }
])
const activePath = ref('') // 当前高亮的路由链接

// 监听器
watch(route, newVal => { // 监听地址栏发生变化，根据 url 地址设置对应的菜单高亮
  activePath.value = newVal.path
}, { immediate: true })
</script>
