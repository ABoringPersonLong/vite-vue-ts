<template>
  <div class="app-main-container relative mt-[-50px] p-[10px] pt-[60px] h-full">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main-container {
  // Transition 组件的过渡样式
  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    position: absolute;
    width: 100%;
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
