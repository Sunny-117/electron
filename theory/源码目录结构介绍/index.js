const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile(
    "node_modules/electron/dist/Electron.app/Contents/Resources/default_app.asar/index.html"
  );
}

app.whenReady().then(createWindow);
