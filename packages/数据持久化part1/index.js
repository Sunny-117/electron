const { app, BrowserWindow, ipcMain, dialog } = require("electron");
require("electron-reload")(__dirname);
const fs = require("fs");
const path = require("path");

console.log(app.getPath("userData")); // /Users/jie/Library/Application Support/demo
console.log(app.getPath("home")); // /Users/jie
console.log(app.getPath("desktop")); // /Users/jie/Desktop
console.log(app.getPath("documents")); // /Users/jie/Documents
console.log(app.getPath("downloads")); // /Users/jie/Downloads
console.log(app.getPath("music")); // /Users/jie/Music

const Store = require("electron-store");
const store = new Store({
  name: "my-first-electron-store-data",
});

store.set("name", "sunny-117");
console.log(store.get("name")); // sunny-117
// 还可以设置 JSON 对象某个属性的值
store.set("foo.bar", "this is a bar");
console.log(store.get("foo")); // {bar: "this is a bar"}
console.log(store.get("aaa")); // undefined

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
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("save-to-desktop", (_, text) => {
  const desktopPath = app.getPath("desktop");
  fs.writeFileSync(path.join(desktopPath, "myTextFile.txt"), text);
});

ipcMain.handle("select-dir", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  // 向外部返回用户所选择的目录
  return result.filePaths[0];
});

ipcMain.on("save-to-dir", (_, { dirPath, text }) => {
  fs.writeFileSync(path.join(dirPath, "myTextFile.txt"), text);
});
