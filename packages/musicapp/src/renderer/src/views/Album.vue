<template>
  <div class="album-container">
    <header class="album-header">
      <div class="title">专辑列表</div>
      <div class="closeAlbumBtn fa-solid fa-close" @click="backHomePage"></div>
    </header>
    <!-- 唱片列表 -->
    <ul class="album-list">
      <li
        v-for="album in albumsInfo"
        :key="album.name"
        class="album-item"
        :data-album="album.name"
        @click="selectAlbum(album.name)"
      >
        <!-- 专辑图片 -->
        <div class="item-left" :data-album="album.name">
          <img :src="album.cover" :alt="album.name" />
        </div>
        <!-- 专辑信息 -->
        <div class="item-right" :data-album="album.name">
          <div>专辑：{{ album.name }}</div>
          <div>歌手：网络歌手</div>
          <div>来源：{{ album.source }}</div>
        </div>
      </li>
    </ul>
    <!-- 歌曲列表 -->
    <div class="song-container" :class="{ 'show-song-list': selectedAlbum }">
      <dl class="song-list">
        <dt class="title-container flex">
          <div>音乐标题</div>
          <div>
            <div>歌手</div>
            <div>专辑</div>
          </div>
        </dt>
        <dd
          v-for="song in albumSongs"
          :key="song.globalIndex"
          class="song-item flex amplitude-song-container amplitude-play-pause"
          @click="playSong(song.globalIndex)"
        >
          <div>{{ song.name }}</div>
          <div>
            <div>{{ song.artist }}</div>
            <div>{{ song.album }}</div>
          </div>
        </dd>
      </dl>
      <div class="arrow-down fa-solid fa-angle-double-down" @click="selectedAlbum = null"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Amplitude from 'amplitudejs/dist/amplitude.min.js'

const router = useRouter()
function backHomePage() {
  router.back()
}

const albumsInfo = ref([]) // 存储专辑信息
const selectedAlbum = ref(null) // 是否选中专辑
const albumSongs = ref([]) // 该专辑对应的歌曲列表

onMounted(() => {
  const songs = Amplitude.getConfig().songs // 示例，需要替换为实际的获取方式
  let uniqueAlbums = new Map()

  songs.forEach((song) => {
    if (!uniqueAlbums.has(song.album)) {
      uniqueAlbums.set(song.album, {
        name: song.album,
        cover: song.cover_art_url,
        source: song.source
      })
    }
  })

  albumsInfo.value = Array.from(uniqueAlbums.values())
})

/**
 * 根据专辑名筛选歌曲
 * @param {*} albumName 专辑名称
 */
function selectAlbum(albumName) {
  const songs = Amplitude.getConfig().songs // 示例，需要替换为实际的获取方式
  selectedAlbum.value = albumName
  albumSongs.value = songs
    .filter((song) => song.album === albumName)
    .map((song) => {
      return {
        ...song,
        globalIndex: songs.indexOf(song) // 保存全局索引
      }
    })
}

const playSong = (index) => {
  Amplitude.playSongAtIndex(index)
}
</script>

<style scoped>
/* 唱片列表 */
.album-container {
  width: 100vw;
  height: calc(100vh - 30px);
  background-color: var(--bg-2);
  position: absolute;
  left: 0;
  top: 30px;
  z-index: 1;
  transition: 0.2 s;
  padding: 10px;
  color: var(--white);
  transition: 0.3s;
  overflow: hidden;
}

.album-header {
  width: 100%;
  height: 70px;
  /* outline: 1px solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  /* padding: 0 10px; */
  user-select: none;
}

.album-header > .closeAlbumBtn {
  cursor: pointer;
}

/* 专辑列表 */
.album-list {
  list-style: none;
  background-color: rgba(136, 135, 135, 0.3);
  height: calc(100vh - 80px);
  margin: 0;
  padding: 0;
  padding-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.album-item {
  width: 95%;
  height: 80px;
  display: flex;
  align-items: center;
  margin: 15px auto;
  cursor: pointer;
  padding: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid rgba(48, 43, 43, 0.3);
}

.album-item:hover {
  background-color: rgba(96, 94, 94, 0.3);
  border-bottom: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.item-left {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-right {
  flex-grow: 1;
  font-size: 14px;
  padding-left: 20px;
  font-weight: 100;
}

/* 歌曲列表 */
.song-container {
  width: 100%;
  height: 400px;
  background: linear-gradient(to bottom, rgba(76, 64, 64, 0.9), rgba(0, 0, 0, 0.8));
  position: absolute;
  left: 0;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 10px;
  font-size: 14px;
  transition: 0.2s;
  transform: translateY(100%);
}

.song-item {
  font-size: 13px;
  cursor: pointer;
  color: #b3b3b3;
  display: flex;
}

.song-item:nth-child(even) {
  background-color: rgba(96, 94, 94, 0.3);
}

.song-item:hover {
  background-color: rgba(96, 94, 94, 0.5);
}

.song-item > div {
  width: 50%;
}
.song-item > div > div {
  width: 50%;
  text-align: center;
}

.flex {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex > div:first-child {
  width: 45%;
  text-align: center;
}

.flex > div:last-child {
  width: 55%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.arrow-down {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 15px;
  left: calc(50% - 5px);
  cursor: pointer;
}

.show-song-list {
  transform: translateY(0);
}
</style>
