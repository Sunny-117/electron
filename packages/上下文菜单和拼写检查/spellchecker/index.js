const { app, BrowserWindow, Menu, MenuItem } = require("electron");
require("electron-reload")(__dirname);

// 创建窗口方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: true,
    },
  });

  win.loadFile("window/index.html");

  win.webContents.on("context-menu", (event, params) => {
    const menu = new Menu();
    // 接下来是为 Menu 实例添加 MenuItem 实例
    // 但是添加多少个，取决于拼写建议有多少个
    params.dictionarySuggestions.forEach((word) => {
      menu.append(
        new MenuItem({
          label: word,
          click: () => {
            // 该方法就是将错误的单词进行一个替换
            win.webContents.replaceMisspelling(word);
          },
        })
      );
    });

    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: "add to dictionary",
          click() {
            win.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            );
          },
        })
      );
    }

    // 最后，调用 popup 方法显示菜单
    if (params.misspelledWord || params.dictionarySuggestions.length > 0) {
      menu.popup();
    }
  });
};

// whenReady 是一个生命周期方法，当 Electron 完成初始化后会调用这个方法
app.whenReady().then(() => {
  createWindow();
});
