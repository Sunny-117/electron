const { ipcRenderer } = require("electron");

const spanContent = document.getElementById("content");

ipcRenderer.on("action", (event, data) => {
  // data 就是回头主进程给我传递过来的数据
  spanContent.innerHTML = data;
});

// 接下来，我们要将我们监听的 action 事件注册到主进程中
ipcRenderer.send("registerChannelEvent", "action");