const { app, BrowserWindow } = require("electron");
const path = require("path");
require(path.join(__dirname, "app.asar", "menu.js"));
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "app.asar", "window/index.html"));
};

app.whenReady().then(() => {
  createWindow();
});
