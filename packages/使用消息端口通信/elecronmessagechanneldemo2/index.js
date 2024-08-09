const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
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

  ipcMain.on("request-port", (event) => {
    // 创建通信端口
    const { port1, port2 } = new MessageChannelMain();
    // port1 主进程自己用
    // port2 给渲染进程用
    // 我们接下来就需要将这个 port2 传递给渲染进程
    event.sender.postMessage("deliver-port", null, [port2]);

    // 监听渲染进程发送过来的消息
    port1.on("message", (event) => {
      if (event.data === "start") {
        // 开始进行复杂的数据处理，并将处理结果返回给渲染进程
        simulateDataProcessing(port1);
      }
    });

    port1.start();
  });
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

/**
 * 模拟复杂的数据处理，然后将处理结果返回给渲染进程
 * @param {*} port
 */
function simulateDataProcessing(port) {
  const interval = setInterval(() => {
    const data = Math.random().toFixed(2);
    port.postMessage(data);
  }, 1000);

  port.on("close", () => {
    clearInterval(interval);
    port.close();
  });
}
