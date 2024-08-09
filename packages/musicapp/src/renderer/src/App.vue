<template>
  <ControlBtns />

  <!-- 使用动态名称来切换过渡方向 -->
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { useMusicStore } from './store'
import { computed } from 'vue'
import ControlBtns from './components/ControlBtns.vue'
const musicStore = useMusicStore()

const transitionName = computed(() => {
  return musicStore.navigationDirection === 'forward' ? 'slide' : 'slide-back'
})
</script>

<style scoped></style>
