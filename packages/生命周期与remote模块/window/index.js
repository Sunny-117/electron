const { BrowserWindow } = require("@electron/remote");

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL("https://www.baidu.com");
});
