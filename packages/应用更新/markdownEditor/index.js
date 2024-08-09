const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
require("./menu");

let win = null;
autoUpdater.autoDownload = false; // 关闭自动下载更新，防止下载失败

// 有更新可用的情况下会触发该事件
autoUpdater.on("update-available", async () => {
  const result = await dialog.showMessageBox({
    type: "info",
    title: "发现新版本",
    message: "发现新版本，是否立即更新？",
    buttons: ["是", "否"],
  });
  if (result.response === 0) {
    // 说明用户点击了是
    autoUpdater.downloadUpdate(); // 开始下载更新
  }
});

// 出错的时候会触发 error 事件
autoUpdater.on("error", (err) => {
  win.webContents.send("error", err.message);
});

// 监听下载进度
// 每次下载进度更新的时候，该事件就会触发
autoUpdater.on("download-progress", (progressObj) => {
  // 拼接一个下载进度的日志信息
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  win.webContents.send("download-progress", log_message);
});

// 监听更新下载完成事件
autoUpdater.on("update-downloaded", () => {
  // 下载完成后，也给用户一个提示，询问是否立即更新
  dialog
    .showMessageBox({
      type: "info",
      title: "安装更新",
      message: "更新下载完成，应用将重启并安装更新",
      buttons: ["是", "否"],
    })
    .then((result) => {
      if (result.response === 0) {
        // 退出应用并安装更新
        autoUpdater.quitAndInstall();
      }
    });
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程里面使用 Node.js
      contextIsolation: false, // 关闭上下文隔离
    },
  });

  return win;
};

app.whenReady().then(() => {
  win = createWindow();
  win.loadFile("./window/index.html");
  // 加载完成后检查更新
  win.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
});
