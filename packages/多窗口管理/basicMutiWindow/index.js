const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);

// 该 map 结构存储所有的窗口引用
const winMap = new Map();

// 窗口1的配置
const win1Config = {
  name: "win1",
  width: 600,
  height: 400,
  show: true,
  file: "window/index.html",
};

// 窗口2的配置
const win2Config = {
  name: "win2",
  width: 400,
  height: 200,
  show: false,
  file: "window2/index.html",
};

// 创建窗口方法
const createWindow = (config) => {
  const win = new BrowserWindow({
    width: config.width,
    height: config.height,
    show: config.show,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(config.file);

  winMap.set(config.name, win);
  console.log(winMap);

  if (config.name === "win2") {
    win.on("close", (e) => {
      // 阻止默认行为，即阻止窗口的真实关闭
      e.preventDefault();
      // 隐藏窗口
      win.hide();
    });
  }
};

ipcMain.on("openWindow", (_, data) => {
  // 根据传递过来的窗口名字在 map 中找到对应的窗口
  // 使其显示
  winMap.get(data).show();
});
ipcMain.on("closeWindow", (_, data) => {
  // 这里关闭窗口，实际上并没有真实的关闭
  // 而是隐藏窗口，方面下次再次打开
  winMap.get(data).hide();
});

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  // 创建窗口1
  createWindow(win1Config);
  // 创建窗口2
  createWindow(win2Config);
});
