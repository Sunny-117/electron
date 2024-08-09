require("./menu");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  // 创建窗口实例
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染器进程中使用 Node.js
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  // 对外暴露窗口实例
  return win;
};

app.whenReady().then(() => {
  const win = createWindow();
  win.loadFile("window/window.html");
});
