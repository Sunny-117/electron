<template>
  <div id="music" class="music">
    <div id="music-player" class="music-player">
      <Header />
      <AlbumDetails />
    </div>
    <div>
      <PlayerControls />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import AlbumDetails from '../components/AlbumDetails.vue'
import PlayerControls from '../components/PlayerControls.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.music {
  position: relative;
  background: var(--bg-2);
  width: 25rem;
  height: 100vh;
  overflow: hidden;
}

.music-player {
  padding: 0 2rem;
  height: 28rem;
}
</style>
