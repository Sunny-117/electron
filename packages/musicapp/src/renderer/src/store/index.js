import { defineStore } from 'pinia'
import Amplitude from 'amplitudejs/dist/amplitude.min.js'

export const useMusicStore = defineStore('music', {
  state: () => ({
    albumCover: '',
    albumTitle: '',
    albumArtist: ''
  }),
  actions: {
    updateCurrentSong() {
      const song = Amplitude.getActiveSongMetadata()
      this.albumCover = song.cover_art_url
      this.albumTitle = song.name
      this.albumArtist = song.artist
    },
    // 添加一个action来更新导航方向
    setNavigationDirection(direction) {
      this.navigationDirection = direction
    }
  }
})
