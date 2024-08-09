// const fs = require("fs");
// console.log(fs);
// const events = require("events");
// const timers = require("timers");
// const url = require("url");
// console.log(events);
// console.log(timers);
// console.log(url);

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  write: (path, data) => {
    // 这里由于不能够直接使用 Node.js 的 API
    // 因此这里仍然是调用主进程的方法
    ipcRenderer.invoke("write", path, data);
  },
});
