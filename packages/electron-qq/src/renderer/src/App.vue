<script setup>
import { reactive, ref, nextTick } from 'vue'
import meAvatar from './assets/avatar.jpg?asset'
import youAvatar from './assets/avatar_2.webp?asset'

// 平台名称
const platform = window.electronAPI.platform
// 初始消息列表
const messages = reactive([
  {
    id: '12312312312',
    role: 'me',
    avatar: meAvatar,
    text: 'hello everyone!'
  },
  {
    id: '12312312312',
    role: 'you',
    avatar: youAvatar,
    text: 'nice to meet you!'
  }
])

// 获取 DOM 节点
const scrollView = ref()
// 获取 textarea 中的文本
const text = ref('')

// 发送消息
async function sendMessage() {
  // 检测文本内容是否为空
  if (text.value === '') return
  const message = {
    id: Date.now(),
    role: messages.length % 2 === 0 ? 'me' : 'you',
    avatar: messages.length % 2 === 0 ? meAvatar : youAvatar,
    text: text.value
  }
  // 追加消息到列表中
  messages.push(message)

  // 回复的消息
  await window.electronAPI.sendMessage(message)

  // 清空 textarea 的内容
  text.value = ''

  // 滚动内容
  nextTick(() => {
    scrollView.value.scrollTop = scrollView.value.scrollHeight
  })
}
</script>

<template>
  <div class="page-layout">
    <div :class="['layout-sidebar', platform]">
      <div class="user-profile">
        <img class="avatar" src="./assets/avatar.jpg" alt="" />
        <span class="status"></span>
      </div>
      <div class="menu-list">
        <a class="menu active" href="javascript:;">
          <span class="iconfont icon-message"></span>
        </a>
        <a class="menu" href="javascript:;">
          <span class="iconfont icon-user"></span>
        </a>
      </div>
    </div>
    <div class="layout-workbench">
      <div class="dragable layout-workbench-titlebar">
        <input class="input" type="text" />
        <span class="iconfont icon-plus"></span>
      </div>
      <div class="history-message">
        <div class="user-info">
          <img class="avatar" src="./assets/avatar.jpg" alt="" />
          <div class="extra">
            <span class="nickname">lotjol</span>
            <span class="message">hello everyone!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="resize-line"></div>
    <div class="layout-main">
      <div :class="['dragable', 'layout-main-titlebar', platform]">
        <span class="nickname">lotjol</span>
      </div>
      <div ref="scrollView" class="layout-main-messages">
        <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
          <img class="avatar" :src="message.avatar" />
          <div class="text">{{ message.text }}</div>
        </div>
      </div>
      <div class="layout-main-toolkit">
        <textarea v-model.trim="text" class="textarea" @keyup.enter="sendMessage"></textarea>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './styles.less';
</style>
