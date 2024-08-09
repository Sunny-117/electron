const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);
require("./menu");
const path = require("path");
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
