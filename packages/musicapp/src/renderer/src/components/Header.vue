<template>
  <!-- 头部 -->
  <div class="main-header">
    <!-- 左侧logo -->
    <img class="logo_img" src="/src/assets/images/logo.png" alt="logo" />
    <!-- 中间标题 -->
    <div class="header-cont">
      <h2 class="header-title">Music Player</h2>
      <h5 class="sub-header-title">Your Melodic Companion</h5>
    </div>
    <!-- 右侧菜单按钮 -->
    <button class="menu-btn" @click="goToAlbum">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToAlbum() {
  router.push('/album')
}
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  padding: 1rem 0;
  border-bottom: 0.2rem solid var(--gray);
}
.main-header .fa-solid {
  font-size: 2rem;
}

.main-header > img {
  user-select: none;
}
.logo_img {
  width: 18%;
  border-radius: 50%;
}
.logo_img:hover {
  transform: all 0.5s ease-in-out;
  background: var(--black);
}

.header-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: -1.5rem;
  line-height: 1.3;
  user-select: none;
}

.header-title {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.25rem;
  text-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
  user-select: none;
}

.sub-header-title {
  font-weight: 300;
  color: var(--fontColor);
}

.menu-btn {
  background: transparent;
  color: var(--fontColor);
  border: none;
  outline: none;
  cursor: pointer;
}
.menu-btn:hover {
  transform: all 0.5s ease-in-out;
  color: var(--white);
}
</style>
