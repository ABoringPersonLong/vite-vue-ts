<template>
  <div class="home-container">
    <Logo />
    <div class="h-full flex">
      <Left />
      <Right />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, inject } from 'vue'
import { getUserById } from '@/api/user'
import Logo from '@/components/logo/Logo.vue'
import Left from '@/components/left/Left.vue'
import Right from '@/components/right/Right.vue'

const message: any = inject('message')

onBeforeMount(async () => {
  const { data } = await getUserById({ id: 10 }).catch(error => error)
  message.info(data)
})
</script>
