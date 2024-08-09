const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);
const path = require("path");

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
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("drag-start", (event) => {
  // event.sender 拿到的是触发事件的窗口
  // 这里的 startDrag 方法用于设置拖拽的文件和图标
  event.sender.startDrag({
    file: path.join(__dirname, "test.md"),
    icon: path.join(__dirname, "iconForDragAndDrop.png"),
  });
});
