const { app, BrowserWindow } = require("electron");

// 存放父窗口的引用
let parentWin = null;
// 存放子窗口的引用
let childWin = null;

// 先窗口两个窗口的配置信息
const win1Config = {
  width: 600,
  height: 400,
  file: "window/index.html",
};

const win2Config = {
  width: 400,
  height: 200,
  file: "window2/index.html",
};

// 创建窗口的方法
const createWindow = (config, parent) => {
  const win = new BrowserWindow({
    width: config.width,
    height: config.height,
    maxWidth: 600,
    maxHeight: 400,
    minWidth: 300,
    minHeight: 200,
    resizable: false,
    // movable: false,
    // x:100,
    // y:100,
    // title: "BrowserWindow title",
    // frame: false,
    // parent: parent ? parent : null,
    // 设置一号窗口置顶
    // alwaysOnTop: parent ? false : true,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  win.loadFile(config.file);

  return win;
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  parentWin = createWindow(win1Config);
  childWin = createWindow(win2Config, parentWin);
  // 接下来我们打算对子窗口进行定位，让子窗口生成的时候就在父窗口的旁边

  // 获取父窗口的位置信息
  const { x, y, width } = parentWin.getBounds();

  // 根据拿到的父窗口的位置信息计算子窗口应该在的位置
  const childWinX = x + width + 15;
  const childWinY = y;

  // 设置子窗口的位置
  // childWin.setPosition(childWinX, childWinY);

  // 显示子窗口
  childWin.show();

  parentWin.setAlwaysOnTop(true, 'pop-up-menu'); 
});
