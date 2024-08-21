const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);

// 创建窗口方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("window/index.html");

  const secondWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      partition: "persist:myCustomPartition",
    },
  });
  secondWin.loadFile("window2/index.html");
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});
