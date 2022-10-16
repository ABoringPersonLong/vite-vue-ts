<template>
  <div class="sidebar-container">
    <el-menu
      class="el-menu-vertical-demo border-0"
      active-text-color="#409eff"
      unique-opened
      router
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activePath"
    >
      <template v-for="item in menuList" :key="item.id">
        <el-menu-item v-if="!item.children" :index="item.path">
          <el-icon :class="['iconfont', item.icon]" />
          <span>{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon :class="['iconfont', item.icon]" />
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="item2 in item.children" :key="item2.id" :index="item2.path">
            <el-icon :class="['iconfont', item2.icon]" />
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onBeforeMount, watch, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'
import { getMenuListApi } from '@/api/menu'

const message: any = inject('message')
const route = useRoute()
const layoutStore = useLayoutStore()

// 定义类型
interface MenuType { // 菜单类型
  id: number
  icon: string
  name: string
  path: string
  children: {
    id: number
    icon: string
    name: string
    path: string
  }[]
}

// 全局状态
const { isCollapse } = storeToRefs(layoutStore)

// 响应式状态
const menuList: Ref<MenuType[]> = ref([]) // 菜单列表
const activePath: Ref<string> = ref('') // 当前高亮的路由链接

// 处理函数
const getMenuList = async () => {
  const { data } = await getMenuListApi().catch(error => error)
  if (!data) return
  if (data.status !== 200) return message.error(data.message)
  menuList.value = data.data
}

// 生命周期函数
onBeforeMount(() => getMenuList())

// 监听器
watch(route, newVal => { // 监听地址栏发生变化，根据 url 地址设置对应的菜单高亮
  activePath.value = newVal.path
}, { immediate: true })
</script>
