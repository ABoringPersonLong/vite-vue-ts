<template>
  <div class="404-container relative h-full overflow-hidden">
    <div class="absolute left-1/2 top-1/2 flex items-center -translate-x-1/2 -translate-y-1/2">
      <div class="animate__animated animate__fadeInLeft">
        <img src="@/assets/images/404.png" alt="404" class="h-80">
      </div>
      <div class="w-[18.75rem] animate__animated animate__fadeInRight">
        <div class="mb-5 text-[#1582f0] text-4xl font-bold">404错误！</div>
        <div class="mb-2.5 text-xl font-bold">找不到网页！</div>
        <div class="mb-8 text-gray-400">对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。</div>
        <button class="btn btn-info text-white" @click="router.push('/home')">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
