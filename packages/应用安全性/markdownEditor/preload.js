const { ipcRenderer, contextBridge } = require("electron");

// 接下来通过 contextBridge 来暴露对应的方法
contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * 渲染进程监听某些事件
   * @param {*} channel 对应的是渲染进程要监听的事件
   * @param {*} listener 触发事件时对应的回调函数
   */
  on: (channel, listener) => {
    const allowedChannels = ["load", "format"];
    // 对于渲染进程监听的事件，我们需要进行白名单校验
    if (allowedChannels.includes(channel)) {
      ipcRenderer.on(channel, (...args) => listener(...args));
    }
  },
  /**
   * 该方法主要是用于渲染进程向主进程发送事件
   */
  send: (channel, data) => {
    const allowedChannels = ["toMain"]; // 白名单
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
