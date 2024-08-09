const { app, BrowserWindow, Tray } = require("electron");
require("electron-reload")(__dirname);
const path = require("path");

let win = null; // 存储窗口实例
let tray = null; // 存储托盘实例
let width = 340;
let height = 460;

// 创建窗口方法
const createWindow = () => {
  win = new BrowserWindow({
    width,
    height,
    frame: false,
    resizable: false,
    show: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("window/index.html");

  win.on("blur", () => {
    win.hide();
  });
};

// 创建托盘图标方法
const createTray = () => {
  // 构建托盘图标的路径
  const trayPath = path.join(__dirname, "assets/tray.png");
  tray = new Tray(trayPath);

  tray.on("click", () => {
    // tray.getBounds() 方法可以获取到托盘图标的位置和大小
    // 返回的是一个对象 {x, y, width, height}
    const trayBounds = tray.getBounds();
    // 接下来设置窗口的位置
    win.setPosition(
      trayBounds.x + trayBounds.width / 2 - width / 2,
      trayBounds.height
    );
    win.isVisible() ? win.hide() : win.show();
  });
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
  createTray();
});
