<template>
  <div class="album-details-container">
    <!-- 唱片封片图 -->
    <div class="image">
      <img
        class="album_img"
        :src="musicStore.albumCover"
        alt="Default Album Image"
        loading="eager"
      />
    </div>
    <!-- 唱片作者信息 -->
    <div class="title-and-author">
      <p class="album_title">{{ musicStore.albumTitle }}</p>
      <p class="artist">{{ musicStore.albumArtist }}</p>
    </div>
  </div>
  <!-- 移动的歌曲名称 -->
  <div class="running-song-title">{{ musicStore.albumTitle }}</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMusicStore } from '../store'
const musicStore = useMusicStore()
onMounted(() => {
  musicStore.updateCurrentSong()
})
</script>

<style scoped>
.album-details-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18rem;
  width: 18rem;
  transform: translate(1.5rem, 1rem);
  background-color: var(--gray);
  border-radius: 0.5rem;
  border: 0.2rem solid var(--gray);
  box-shadow:
    inset -0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.3),
    0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.3);
}
.album-details-container:hover {
  border: 0.2rem solid var(--white);
}

.image {
  position: relative;
  display: block;
  height: 13rem;
  width: 13rem;
}

.album_img {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
@keyframes melt {
  0% {
    clip-path: path(
      'M0 -0.8C8.33 -8.46 16.67 -12.62 25 -12.62C37.5 -12.62 35.91 0.15 50 -0.8C64.09 -0.4 62.5 -34.5 75 -34.5C87.5 -34.5 87.17 -4.45 100 -0.8C112.83 4.2 112.71 -17.95 125 -18.28C137.29 -18.62 137.76 1.54 150.48 -0.8C163.19 -1.79 162.16 -25.12 174.54 -25.12C182.79 -25.12 191.28 -16.79 600 -0.8L600 -34.37L0 -34.37L0 -0.8Z'
    );
  }
  25%,
  49.9999% {
    clip-path: path(
      'M0 199.88C8.33 270.71 16.67 306.13 25 306.13C37.5 306.13 35.91 231.4 50 231.13C64.09 230.85 62.5 284.25 75 284.25C87.5 284.25 87.17 208.05 100 212.38C112.83 216.7 112.71 300.8 125 300.47C137.29 300.13 137.76 239.04 150.48 237.38C163.19 235.71 162.16 293.63 174.54 293.63C182.79 293.63 191.28 262.38 300 199.88L300 0.13L0 0.13L0 199.88Z'
    );
  }
  50% {
    clip-path: path(
      'M0 0C8.33 -8.33 16.67 -12.5 25 -12.5C37.5 -12.5 36.57 -0.27 50 0C63.43 0.27 62.5 -34.37 75 -34.37C87.5 -34.37 87.5 -4.01 100 0C112.5 4.01 112.38 -18.34 125 -18.34C137.62 -18.34 138.09 1.66 150.48 0C162.86 -1.66 162.16 -25 174.54 -25C182.79 -25 191.28 -16.67 200 0L200 200L0 200L0 0Z'
    );
  }
  75%,
  100% {
    clip-path: path(
      'M0 400C8.33 270.83 16.67 306.25 25 306.25C37.5 306.25 36.57 230.98 50 231.25C63.43 231.52 62.5 284.38 75 284.38C87.5 284.38 87.5 208.49 100 212.5C112.5 216.51 112.38 300.41 125 300.41C137.62 300.41 138.09 239.16 150.48 237.5C162.86 235.84 162.16 293.75 174.54 293.75C182.79 293.75 191.28 262.5 400 400L400 400L0 400L0 400Z'
    );
  }
}
.title-and-author {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  height: 13rem;
  width: 13rem;
  color: var(--white);
  font-size: 1rem;
  border-radius: 50%;
  text-align: center;
  background-color: #676767;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.4);
  animation: melt 8s infinite linear;
}

.running-song-title {
  font-size: 1rem;
  color: var(--fontColor);
  padding-top: 2rem;
  text-transform: uppercase;
  font-weight: 600;
  transform: translateX(-25rem);
  text-decoration: underline 0.5rem var(--gray);
  text-underline-offset: 0.3rem;
  animation: scroll 8s infinite;
}

@keyframes scroll {
  to {
    transform: translateX(25rem);
  }
}
</style>
