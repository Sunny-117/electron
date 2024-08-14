const { BrowserWindow } = require("@electron/remote");
// remote模块实现跨进程访问
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL("https://www.baidu.com");
});
