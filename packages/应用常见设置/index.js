require("./menu");
require("./shortcut");

const { app, BrowserWindow, ipcMain, dialog, Tray, Menu } = require("electron");
const path = require("path");

let win = null; // 存储窗口的实例
let tray = null; // 存储托盘的实例

// 只要涉及到异步的操作，我们就使用 handle 方法
ipcMain.handle("show-open-dialog", async function () {
  // 获取到聚焦的窗口
  const window = BrowserWindow.getFocusedWindow();

  // 当调用该方法的时候，就会打开系统的窗口
  return dialog.showOpenDialog(window, {
    title: "我要打开一个文件",
    buttonLabel: "点击该按钮打开文件",
    defaultPath: app.getPath("pictures"),
    properties: ["openFile", "openDirectory", "multiSelections"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif"] },
      { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
    ],
  });
});

// 创建窗口的方法
const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  win.loadFile("window/index.html");
};

function createTray() {
  // 构建托盘图标的路径
  const iconPath = path.join(__dirname, "assets/tray.jpg");
  tray = new Tray(iconPath);

  // 我们的图标需要有一定的功能
  tray.on("click", function () {
    win.isVisible() ? win.hide() : win.show();
  });

  // 还可以设置托盘图标对应的菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示/隐藏",
      click: () => {
        win.isVisible() ? win.hide() : win.show();
      },
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
  createTray();
});
