const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const url = require("url");
const path = require("path");

// 存储所有的窗口实例对象
const winRef = [];
// 用于记录消息通道，也就是记录窗口进程要注册的事件
const messageChannelRecord = {};

/**
 *
 * @param {*} channel 窗口进程中要注册的事件
 * @param {*} webContentsId 窗口对应的 id
 */
function registerChannel(channel, webContentsId) {
  if (messageChannelRecord[channel] !== undefined) {
    // 如果进入到这里，说明当前这个 channel 已经被注册过了
    // 接下来我们需要判断当前窗口是否已经注册过这个 channel
    let alreadyRegister = false;
    for (let i = 0; i < messageChannelRecord[channel].length; i++) {
      if (messageChannelRecord[channel][i] === webContentsId) {
        alreadyRegister = true;
        break;
      }
    }
    // 只需要根据 alreadyRegister 的值来判断是否需要注册
    if (!alreadyRegister) {
      messageChannelRecord[channel].push(webContentsId);
    }
  } else {
    // 如果进入到这里，说明当前这个 channel 还没有被注册过
    // 最终 channel 的数据结构是这样的：
    // {
    //   action: [1],
    // }
    messageChannelRecord[channel] = [webContentsId];
  }
}

ipcMain.on("registerChannelEvent", (event, channel) => {
  try {
    registerChannel(channel, event.sender.id);
  } catch (e) {
    console.error(e);
  }
});

/**
 *
 * @param {*} channel 窗口进程注册的事件
 * @return {*} 返回一个数组，数组中存储的是窗口进程的 id
 */
function getWebContentsId(channel) {
  return messageChannelRecord[channel] || [];
}

/**
 *
 * @param {*} webContentsIds 注册了 channel 事件的窗口 id 的数组
 * @param {*} channel 对应的事件
 * @param {*} data 要传递的数据
 */
function transText(webContentsIds, channel, data) {
  // 遍历 webContentsIds，然后根据 id 获取到对应的窗口实例对象
  for (let i = 0; i < webContentsIds.length; i++) {
    for (let j = 0; i < winRef.length; j++) {
      if (winRef[j].webContents.id === webContentsIds[i]) {
        // 进入此 if，说明当前窗口实例对象就是我们要找的窗口实例对象
        // 接下来我们就可以向这个窗口实例对象发送消息了
        winRef[j].webContents.send(channel, data);
        break;
      }
    }
  }
}

ipcMain.on("transTextEvent", (event, channel, data) => {
  try {
    transText(getWebContentsId(channel), channel, data);
  } catch (e) {
    console.error(e);
  }
});

// 创建窗口的方法
const createWindow = (url) => {
  // 创建的窗口实例对象
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程（在窗口）里面使用 node.js
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });

  win.loadURL(url);

  return win;
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  // 拼接 url
  const url1 = url.format({
    protocol: "file",
    pathname: path.join(__dirname, "window1/window1.html"),
  });

  const url2 = url.format({
    protocol: "file",
    pathname: path.join(__dirname, "window2/window2.html"),
  });

  winRef.push(createWindow(url1));
  winRef.push(createWindow(url2));
});
