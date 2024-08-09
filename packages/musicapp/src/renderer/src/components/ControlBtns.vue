<template>
  <div class="control-btns" @mousedown="onMouseDown">
    <div class="closeBtn fa-solid fa-close" @click="closeWindow"></div>
    <div class="minimizeBtn fa-solid fa-angle-down" @click="minimaizeWindow"></div>
  </div>
</template>

<script setup>
// 处理拖动
let offset = null // 记录用户拖拽的偏移值
let isDragging = false // 记录用户是否正在拖拽
function onMouseDown(e) {
  isDragging = true // 设置一个开关，表示用户正在拖拽
  offset = {
    x: e.screenX - window.screenX,
    y: e.screenY - window.screenY
  }
  document.onmousemove = (e) => {
    if (isDragging) {
      // 从最新的鼠标位置获取 x 和 y
      const { screenX, screenY } = e
      window.moveTo(screenX - offset.x, screenY - offset.y)
    }
  }
  document.onmouseup = () => {
    isDragging = false // 用户停止拖拽
    offset = null // 重置偏移值
    document.onmouseup = null
    document.onmousemove = null
  }
}
// 最小化窗口
function minimaizeWindow() {
  // 这里不再是直接使用 ipcRenderer 发送消息，而是调用 window.api 对象的方法
  // 触发预加载脚本中的方法
  window.api.minimizeWindow()
}
// 关闭应用
function closeWindow() {
  window.api.closeWindow()
}
</script>

<style scoped>
.control-btns {
  width: 100vw;
  height: 30px;
  /* outline: 1px solid; */
  display: flex;
  align-items: center;
  background-color: var(--bg-4);
}
.control-btns > div {
  width: 14px;
  height: 14px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  margin-left: 8px;
  cursor: pointer;
}

.control-btns > div:first-child {
  background-color: rgb(237, 26, 26);
  color: rgb(237, 26, 26);
  transition: 0.5s;
}

.control-btns > div:first-child:hover {
  color: var(--gray2);
}

.control-btns > div:last-child {
  background-color: rgb(252, 162, 6);
  color: rgb(252, 162, 6);
  transition: 0.5s;
  padding-top: 2px;
}

.control-btns > div:last-child:hover {
  color: var(--gray2);
}
</style>
