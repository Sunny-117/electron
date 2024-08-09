const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);

// 该 map 结构存储所有的窗口引用
const winMap = new Map();

// 创建普通窗口方法
const createWindow = (config) => {
  const win = new BrowserWindow({
    width: config.width,
    height: config.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(config.file);

  // 接下来我们要根据分组名将窗口引用存储到 map 结构中
  if (config.group) {
    // 根据你的分组名，先找到对应的窗口数组
    let groupArr = winMap.get(config.group);
    if (groupArr) {
      // 如果数组存在，直接 push 进去
      groupArr.push(win);
    } else {
      // 新创建一个数组，作为该分组的第一个窗口
      groupArr = [win];
    }
    // 接下来更新 map
    winMap.set(config.group, groupArr);

    // 接下来还需要监听窗口的关闭事件，以便在窗口关闭时将其从 map 结构中移除
    win.on("close", () => {
      groupArr = winMap.get(config.group);
      // 因为当前的窗口已经关闭，所以我们需要将其从数组中移除
      groupArr = groupArr.filter((item) => item !== win);
      // 接下来更新 map
      winMap.set(config.group, groupArr);
      // 如果该分组下已经没有窗口了，我们需要将其从 map 结构中移除
      if (groupArr.length === 0) {
        winMap.delete(config.group);
      }
      console.log("winMap:", winMap);
    });
    console.log("winMap:", winMap);
  }

  return win;
};

// 创建主窗口方法
const createMainWindow = () => {
  createWindow({
    name: "main",
    width: 800,
    height: 600,
    file: "window/index.html",
  });
};

ipcMain.on("create-window", (_, config) => {
  createWindow(config);
});

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(createMainWindow);
