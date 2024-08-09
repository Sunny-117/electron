const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);

// 创建窗口方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 350,
    transparent: true, // 设置窗口透明
    resizable: false, // 设置窗口不可缩放
    frame: false, // 隐藏窗口边框
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("window/index.html");

  win.setAlwaysOnTop(true, "pop-up-menu"); // 设置窗口置顶
  win.setIgnoreMouseEvents(true); // 设置鼠标事件可以穿透
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("setIgnoreMouseEvent", (e, ...args) => {
  // 通过 BrowserWindow.fromWebContents(e.sender) 拿到当前的窗口
  // 等同于上面的 win
  BrowserWindow.fromWebContents(e.sender).setIgnoreMouseEvents(...args);
});
