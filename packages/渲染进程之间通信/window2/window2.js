const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");
const content = document.getElementById("content");

btn.addEventListener("click", () => {
  // 将输入框的数据发送给主进程
  // 回头在主进程需要有一个 transTextEvent 的监听事件
  ipcRenderer.send("transTextEvent", "action", content.value);
});
