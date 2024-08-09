const fs = require("fs");
const { contextBridge } = require("electron");

// 通过 contextBridge 暴露给渲染进程的方法
contextBridge.exposeInMainWorld("myAPI", {
  write: fs.writeSync,
  open: fs.openSync,
});
