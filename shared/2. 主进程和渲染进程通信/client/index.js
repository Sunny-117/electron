const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");

// 创建一个监听频道
ipcMain.on("test", (event, data) => {
  // 主进程拿到数据之后，我们要给渲染进程回一个话
  try {
    console.log(data, "主进程");
    // 给渲染进程回话
    event.reply("data-res", "主进程已经收到消息啦，哈哈哈哈哈");
  } catch (err) {
    console.error(err);
  }
});

// 创建窗口的方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  win.loadFile("window/window.html");
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
});
