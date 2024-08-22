const { app, BrowserWindow, ipcMain } = require("electron");

// 创建窗口的方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1600,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    }
  });
  win.loadFile("index.html");
  ipcMain.on('asynchronous-message', (event, arg)=>{
    console.log(event, arg)
    event.reply("reply-message", "hello from main process")
  })
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
});
