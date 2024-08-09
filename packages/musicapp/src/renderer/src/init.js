import Amplitude from 'amplitudejs/dist/amplitude.min.js'
import { useMusicStore } from './store'
Amplitude.init({
  songs: [
    {
      name: 'Gotta Have You',
      url: '/src/assets/music/Gotta Have You.mp3',
      album: '英文专辑',
      cover_art_url: '/src/assets/images/GottaHaveYou.jpeg',
      artist: 'Stevie Wonder',
      source: '网络'
    },
    {
      name: 'K歌之王',
      url: '/src/assets/music/K歌之王 - 陈奕迅.mp3',
      album: '中文专辑',
      cover_art_url: '/src/assets/images/陈奕迅.jpeg',
      artist: '陈奕迅',
      source: '网络'
    },
    {
      name: 'Give A Little Love',
      url: '/src/assets/music/M2M - Give A Little Love.mp3',
      album: '英文专辑',
      cover_art_url: '/src/assets/images/m2m.jpeg',
      artist: 'M2M',
      source: '网络'
    },
    {
      name: 'Dream',
      url: '/src//assets/music/Miley Cyrus - Dream.mp3',
      album: '英文专辑',
      cover_art_url: '/src/assets/images/dream.jpeg',
      artist: 'Miley Cyrus',
      source: '网络'
    },
    {
      name: '聚集记忆的时间',
      url: '/src/assets/music/Nell - 聚集记忆的时间.mp3',
      album: '韩文专辑',
      cover_art_url: '/src/assets/images/nell.jpg',
      artist: 'Nell',
      source: '网络'
    },
    {
      name: '勇气100%',
      url: '/src/assets/music/光GENJI - 勇气百分百.mp3',
      album: '日文专辑',
      cover_art_url: '/src/assets/images/勇气百分百.jpeg',
      artist: '光GENJI',
      source: '网络'
    },
    {
      name: '光と影のロマン',
      url: '/src/assets/music/光と影のロマン - 宇德敬子.mp3',
      album: '日文专辑',
      cover_art_url: '/src/assets/images/宇德敬子.jpeg',
      artist: '宇德敬子',
      source: '网络'
    }
  ],
  volume: 50,
  callbacks: {
    // 自动切换歌曲的时候触发
    song_change: () => {
      // 这里我们需要去更新一下当前播放的歌曲
      const musicStore = useMusicStore()
      musicStore.updateCurrentSong()
    }
  }
})
