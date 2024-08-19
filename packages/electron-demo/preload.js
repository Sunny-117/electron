const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('test', 'window.test')

// 为 window 扩展一些属性或方法
contextBridge.exposeInMainWorld('electronAPI', {
  // 平台的名称
  platform: process.platform,
  // 获取系统版本号
  getVersions() {
    return process.versions
  },
  // 发送用户的消息
  sendMessage(message) {
    return ipcRenderer.invoke('handle-message', message)
  },
})
