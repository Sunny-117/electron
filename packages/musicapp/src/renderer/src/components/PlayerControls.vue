<template>
  <div class="player_controls">
    <!-- 控制面板 -->
    <div class="audio">
      <div class="play-container">
        <!-- 播放按钮 -->
        <div class="playBtnContainer">
          <div
            class="playBtn amplitude-play-pause"
            :class="{
              'amplitude-playing': isPlaying,
              'amplitude-paused': !isPlaying
            }"
            @click="togglePlay"
          ></div>
        </div>
        <!-- 播放时间 -->
        <div class="time-container">
          <!-- 当前时间 -->
          <span class="current-time">
            <span class="amplitude-current-minutes"></span>:<span
              class="amplitude-current-seconds"
            ></span>
          </span>
          <span class="separator">/</span>
          <!-- 总时长 -->
          <span class="duration">
            <span class="amplitude-duration-minutes"></span>:<span
              class="amplitude-duration-seconds"
            ></span>
          </span>
        </div>
        <div class="progress-volume-container">
          <!-- 播放进度 -->
          <div class="progress-container" :style="{ width: progressContainerWidth }">
            <input
              v-model="currentSongProgress"
              type="range"
              class="amplitude-song-slider"
              @input="updateSongProgress"
            />
          </div>
          <!-- 音量滑块 -->
          <div
            class="volume-container"
            :style="{
              width: volumeContainerWidth,
              display: volumeContainerDisplay
            }"
          >
            <input
              v-model="currentVolume"
              type="range"
              class="volume-slider amplitude-volume-slider"
              @input="updateVolume"
            />
          </div>
        </div>
        <!-- 静音按钮 -->
        <div
          class="mute-button amplitude-mute"
          :class="{
            'amplitude-not-muted': !isMuted,
            'amplitude-muted': isMuted
          }"
          @click="toggleMute"
          @mouseenter="showVolumeControl"
        ></div>
      </div>
    </div>
    <!-- 下方三个按钮 -->
    <div class="addl-controls">
      <button class="prev btn">
        <i class="fa-solid fa-backward" @click="prevSong"></i>
      </button>
      <button class="shuffle btn" :class="{ 'shuffle-active': isShuffle }">
        <i class="fa-solid fa-shuffle" @click="toggleShuffle"></i>
      </button>
      <button class="next btn">
        <i class="fa-solid fa-forward" @click="nextSong"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Amplitude from 'amplitudejs/dist/amplitude.min.js'
import { useMusicStore } from '../store'
const musicStore = useMusicStore()

const isPlaying = ref(false)
const isMuted = ref(false)
const isShuffle = ref(false)

// 用于记录之前的音量
let volume = 0

// 切换播放状态的方法
function togglePlay() {
  const playState = Amplitude.getPlayerState()
  if (playState === 'playing') {
    Amplitude.pause()
    isPlaying.value = false
  } else if (playState === 'paused' || playState === 'stopped') {
    Amplitude.play()
    isPlaying.value = true
  }
}

// 切换静音状态
function toggleMute() {
  if (isMuted.value) {
    Amplitude.setVolume(volume)
    isMuted.value = false
  } else {
    volume = Amplitude.getVolume()
    Amplitude.setVolume(0)
    isMuted.value = true
  }
}

// 下一曲
function nextSong() {
  Amplitude.next()
  musicStore.updateCurrentSong()
}

// 上一曲
function prevSong() {
  Amplitude.prev()
  musicStore.updateCurrentSong()
}

// 切换随机播放
function toggleShuffle() {
  const shuffleState = Amplitude.getShuffle()
  if (shuffleState) {
    Amplitude.setShuffle(false)
    isShuffle.value = false
  } else {
    Amplitude.setShuffle(true)
    isShuffle.value = true
  }
}

const progressContainerWidth = ref('100%')
const volumeContainerWidth = ref('0%')
const volumeContainerDisplay = ref('none')

const showVolumeControl = () => {
  progressContainerWidth.value = '60%'
  volumeContainerWidth.value = '35%'
  volumeContainerDisplay.value = 'block'
}

const hideVolumeControl = () => {
  progressContainerWidth.value = '100%'
  volumeContainerWidth.value = '0%'
  volumeContainerDisplay.value = 'none'
}

onMounted(() => {
  // 给 document 绑定点击事件，当点击页面任何地方时隐藏音量滑块
  document.addEventListener('click', hideVolumeControl)
  // 阻止在 volume-container 内的点击事件冒泡，以避免点击滑块时隐藏滑块
  document
    .querySelector('.volume-container')
    .addEventListener('click', (event) => event.stopPropagation())
})

onBeforeUnmount(() => {
  // 组件卸载时移除事件监听器，防止内存泄漏
  document.removeEventListener('click', hideVolumeControl)
})

const currentSongProgress = ref(0) // 可能需要计算当前歌曲的播放进度

function updateSongProgress() {
  // 计算播放进度的百分比
  const songProgress = (currentSongProgress.value / 100) * Amplitude.getSongDuration()
  Amplitude.setSongPlayedPercentage((songProgress / Amplitude.getSongDuration()) * 100)
}

const currentVolume = ref(Amplitude.getVolume())

function updateVolume() {
  Amplitude.setVolume(currentVolume.value)
}
</script>

<style scoped>
.player_controls {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 7rem;
  margin-top: 0.3rem;
  overflow: hidden;
  background: var(--bg-2);
}
.player_controls:before {
  position: absolute;
  content: '';
  height: 3rem;
  width: 16.5rem;
  margin-top: 2rem;
  border-radius: 40%;
  border-color: transparent gray gray gray;
  border-width: 0.3rem;
  border-style: solid;
}
.player_controls:hover::before {
  transition: all 0.5s ease-in-out;
  border-color: transparent #fff #fff #fff;
}
.player_controls:hover::after {
  transition: all 0.5s ease-in-out;
  background: var(--white);
}

.addl-controls {
  position: relative;
  top: 20px;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  height: 2.5rem;
  width: 8rem;
  margin-top: -1rem;
  z-index: 1;
  border-radius: 0.5rem;
  background: var(--gray);
  transform: translate(2.5rem, 0.7rem) rotate(-3.5deg);
}
.addl-controls:hover {
  background: var(--white);
}
.addl-controls:hover .btn {
  color: var(--black);
  border-radius: 0.5rem;
}

.btn {
  font-size: 0.8rem;
  outline: none;
  border: none;
  padding: 0.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--white);
  background: transparent;
  transform: scale(1);
}
.btn:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.8);
}

.shuffle-active {
  color: var(--black);
  background: var(--white);
  border-radius: 0.5rem;
}

/* 重写控制面板 */
.play-container {
  width: 300px;
  height: 40px;
  /* outline: 1px solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 15px;
}

.playBtnContainer {
  width: 15%;
  height: 100%;
  /* outline: 1px solid; */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-right: 5px;
}

/* 播放按钮 */
.playBtn {
  width: 35px;
  height: 35px;
  /* outline: 1px solid; */
}

.playBtn.amplitude-play-pause.amplitude-playing {
  background: url('/src/assets/images/baseline-pause_circle_filled-24px.svg') center no-repeat;
  background-size: 30px;
  background-color: var(--gray);
  border-radius: 5px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.playBtn.amplitude-play-pause.amplitude-paused {
  background: url('/src/assets/images/baseline-play_circle_filled-24px.svg') center no-repeat;
  background-size: 30px;
  background-color: var(--gray);
  border-radius: 5px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* 显示播放时间 */
.time-container {
  width: 25%;
  height: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  /* outline: 1px solid; */
}

.time-container > .separator {
  margin: 0 5px;
}

/* 进度条和音量控制面板 */
.progress-volume-container {
  width: 60%;
  height: 100%;
  /* outline: 1px solid var(--white); */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 进度条 */
.progress-container {
  width: 100%;
  height: 100%;
  /* outline: 1px solid; */
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: 0.5s;
}

.progress-container > input {
  width: 100%;
}

input[type='range'] {
  display: flex;
  appearance: none;
  width: 100%;
  background: transparent;
}

/* 设置已滑动部分（track）的样式 */
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background: #888888; /* 已滑动部分的颜色 */
  border-radius: 4px;
}

/* 设置滑块（thumb）的样式 */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #d2cdcd; /* 滑块边框颜色 */
  height: 14px; /* 滑块高度 */
  width: 14px; /* 滑块宽度 */
  border-radius: 50%; /* 滑块为圆形 */
  background: #fff; /* 滑块背景颜色 */
  margin-top: -5px; /* 修正滑块位置 */
  cursor: pointer;
}

/* 静音按钮 */
.mute-button {
  width: 40px;
  height: 90%;
  /* outline: 1px solid; */
}

.mute-button.amplitude-mute.amplitude-not-muted {
  background: url('/src/assets/images/baseline-volume_up-24px.svg') center no-repeat;
  background-size: 25px;
  background-color: var(--gray);
  border-radius: 5px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.mute-button.amplitude-mute.amplitude-muted {
  background: url('/src/assets/images/baseline-volume_off-24px.svg') center no-repeat;
  background-size: 25px;
  background-color: var(--gray);
  border-radius: 5px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.volume-container {
  width: 0%;
  display: none;
}
</style>
