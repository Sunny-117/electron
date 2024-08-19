import { contextBridge, ipcRenderer } from 'electron'

// 暴露一些属性或方法
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  sendMessage(message) {
    return ipcRenderer.invoke('handle-message', message)
  }
})
