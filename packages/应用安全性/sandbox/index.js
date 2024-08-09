const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);
const path = require("path");
const fs = require("fs");

// 创建窗口方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // sandbox: false,
      preload: path.join(__dirname, "preload.js"),
      // webSecurity: false,
    },
  });

  win.loadFile("window/index.html");
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

// 在主进程提供相应的方法
ipcMain.handle("write", async (event, path, data) => {
  fs.writeFileSync(path, data);
});
