const { app, BrowserWindow } = require("electron");
const remoteMain = require("@electron/remote/main");
const path = require("path");
// 要做一个初始化操作
remoteMain.initialize();

// 创建窗口方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.on("minimize", () => {
    console.log("窗口最小化了");
  });

  win.loadFile("window/index.html");

  // 为 remoteMain 指定要启用给渲染进程的模块
  remoteMain.enable(win.webContents);
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});
