const { ipcRenderer } = require("electron");

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

// 这里我们想要在 win1 中控制 win2 的显示和隐藏
openBtn.addEventListener("click", () => {
  ipcRenderer.send("openWindow", "win2");
});
closeBtn.addEventListener("click", () => {
  ipcRenderer.send("closeWindow", "win2");
});
