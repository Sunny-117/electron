const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);
// const initErrorHandler = require("./errorHandler");
const path = require("path");

const { init } = require("@sentry/electron");
init({
  dsn: "你自己的SDK",
});

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
  // 初始化全局异常处理模块
  // initErrorHandler.initGlobalErrorHandler();
  throw new Error("主进程主动抛出的错误");
});

ipcMain.handle("get-log-path", () => {
  const logPath = path.join(app.getPath("appData"), "Markdown", "logs");
  return logPath;
});
