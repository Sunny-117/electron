const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);
const WindowManager = require("./pool/WindowManager");

let winManager = null; // 存储窗口池实例
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

  win.loadFile("mainWindow/index.html");
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
  winManager = new WindowManager(); // 实例化窗口池类
  winManager.init(3); // 初始化窗口池

  ipcMain.handle("get-pools-info", () => {
    // 这里在向外部返回窗口信息的时候，信息必须是能够被序列化的
    const simplifiedPoolsInfo = winManager.pools.map((item) => {
      return {
        id: item.id,
        width: item.width,
        height: item.height,
        x: item.x,
        y: item.y,
      };
    });
    return {
      count: winManager.getWindowCount(),
      pools: simplifiedPoolsInfo,
    };
  });

  // 从窗口池请求新的窗口
  ipcMain.on("request-new-window", (_, data) => {
    // 从窗口池里面取一个窗口出来
    if (winManager.getWindowCount() > 0) {
      // 说明窗口池里面有空余窗口
      const win = winManager.getWindow();
      // 根据传递过来的 data，对窗口进行相应的设置
      if (data.width && data.height) {
        win.window.setSize(parseInt(data.width), parseInt(data.height));
      }
      if (data.x && data.y) {
        win.window.setPosition(parseInt(data.x), parseInt(data.y));
      }
      if (data.url) {
        win.window.loadURL(data.url);
      }
      win.window.show();
      // 将窗口信息传递给渲染进程
      win.window.webContents.send("window-info", {
        id: win.id,
        width: data.width ? parseInt(data.width) : win.width,
        height: data.height ? parseInt(data.height) : win.height,
        x: data.x ? parseInt(data.x) : win.x,
        y: data.y ? parseInt(data.y) : win.y,
      });
    } else {
      // 进入此分支，说明窗口池里面没有窗口了
      console.log("窗口池里面没有窗口了");
    }
  });

  ipcMain.on("create-new-window", () => {
    winManager.createDefaultSettingWindow();
  });
});
