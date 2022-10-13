<template>
  <div class="home-container h-full">
    <el-card class="scroll-bar flex justify-center items-center h-full">
      <HelloWorld @click="sendRequest" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { getUserById } from '@/api/user'

const message: any = inject('message')

const sendRequest = async () => {
  const { data } = await getUserById({ id: 10 }).catch(error => error)
  message.info(data)
}
</script>
