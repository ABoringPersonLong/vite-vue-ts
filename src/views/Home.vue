<template>
  <div class="home-container">
    <Logo />
    <div class="h-full flex">
      <Left @click="sendRequest" />
      <Right @click="sendRequest" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import Logo from '@/components/Logo.vue'
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'
import { getUserById } from '@/api/user'

const message: any = inject('message')

const sendRequest = async () => {
  const { data } = await getUserById({ id: 10 }).catch(error => error)
  message.info(data)
}
</script>
