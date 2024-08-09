const {
  app,
  BrowserWindow,
  screen,
  globalShortcut,
  desktopCapturer,
  ipcMain,
  dialog,
  nativeImage,
} = require("electron");
require("electron-reload")(__dirname);
const fs = require("fs");

let win = null; // 存储窗口实例
// 获取单实例锁
const winTheLock = app.requestSingleInstanceLock();
if (winTheLock) {
  // 如果进入到此分支，说明当前没有其他实例在运行
  // 我们可以正常创建应用

  // 创建窗口方法
  const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
      width,
      height,
      frame: false,
      show: false,
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

    // 注册一个全局的快捷键，用于做屏幕截图操作
    globalShortcut.register("ctrl+q", () => {
      // 告诉渲染进程准备开始截图
      win.webContents.send("begin-capture");
    });

    ipcMain.handle("get-source", async () => {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      const sources = await desktopCapturer.getSources({
        types: ["screen"],
        thumbnailSize: {
          width,
          height,
        },
      });
      return sources[0].thumbnail;
    });

    ipcMain.on("show-window", (_, { width, height }) => {
      // 将窗口的宽高设置得和截图的宽高一样
      win.setSize(width, height);
      // 让窗口居中
      win.center();
      win.show();
    });

    ipcMain.on("save-pic", (_, dataURL) => {
      dialog
        .showOpenDialog(win, {
          properties: ["openDirectory"],
        })
        .then((result) => {
          if (!result.canceled) {
            // 说明用户选择了一个目录
            // 创建一个 image 对象
            const image = nativeImage.createFromDataURL(dataURL);
            // 将 nativeImage 转换的 PNG 的 buffer
            const buffer = image.toPNG();
            // 最后一步，将 buffer 写入到文件
            fs.writeFileSync(
              `${result.filePaths[0]}/screenshot${Date.now()}.png`,
              buffer
            );
            // 关闭窗口
            win.hide();
          }
        });
    });

    ipcMain.on("close-window", () => {
      win.hide();
    });
  });
} else {
  // 如果进入到此分支，说明当前已经有一个实例在运行
  // 我们需要退出当前实例
  app.quit();
}
