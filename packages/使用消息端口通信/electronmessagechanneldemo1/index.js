const { app, BrowserWindow, ipcMain } = require("electron");
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
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("port", (event) => {
  // 拿到渲染进程给我传递过来的 port2
  const port = event.ports[0];

  port.on("message", (event) => {
    console.log("渲染进程给我传递过来的信息为：", event.data);
    // 目前为止，主进程已经能够收到渲染进程传递过来的信息了
    // 接下来主进程再给渲染进程传递一些信息
    port.postMessage("我收到你的消息了，周末出来玩呗～");
  });

  // 接下来开启这个端口，这意味着两者之间可以进行通信了
  port.start();
});
