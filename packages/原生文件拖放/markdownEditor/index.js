const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload")(__dirname);
require("./menu");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  return win;
};

app.whenReady().then(() => {
  const win = createWindow();
  win.loadFile("./window/index.html");
});

const tempFilePathArr = []; // 用于记录临时文件的路径

ipcMain.on("ondragstart", (ev, content) => {
  // 1. 将传递过来的内容写入到一个本地的临时 md 文件里面
  const tempFilePath = path.join(__dirname, `temp-${Date.now()}.md`);
  fs.writeFileSync(tempFilePath, content, "utf-8");
  tempFilePathArr.push(tempFilePath);

  // 2. 设置拖拽
  ev.sender.startDrag({
    file: tempFilePath,
    icon: path.join(__dirname, "assets/iconForDragAndDrop.png"),
  });

  // 3. 解决拖拽结束后，markdown 编辑器内容丢失的问题
  // 解决方法就是重新将内容写入到文件里面
  setTimeout(() => {
    ev.sender.send("load", content);
  }, 1000);
});

// 应用在退出之前，需要将临时生成的 md 文件删除掉
app.on("before-quit", () => {
  if (tempFilePathArr.length) {
    // 说明有临时文件，我们进行删除操作
    tempFilePathArr.forEach((filePath) => {
      // 进行删除
      fs.unlinkSync(filePath);
    });
  }
});
