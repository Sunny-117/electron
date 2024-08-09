const { app, Menu, BrowserWindow, dialog } = require("electron");
const fs = require("fs");

// 打开文件
function loadFile() {
  // 获取当前聚焦的窗口
  const window = BrowserWindow.getFocusedWindow();
  const files = dialog.showOpenDialogSync(window, {
    properties: ["openFile"],
    title: "选择你要打开的 Markdown 文件",
    defaultPath: app.getPath("documents"),
    filters: [{ name: "Markdown", extensions: ["md", "markdown", "txt"] }],
  });
  if (!files) return;

  const file = files[0];
  // 使用 fs 模块读取文件内容
  const fileContent = fs.readFileSync(file).toString();
  // 通过 webContents 发送事件到渲染进程，同时将文件内容传过去
  window.webContents.send("load", fileContent);
}

// 保存文件
async function saveFile() {
  // 获取当前聚焦的窗口
  const window = BrowserWindow.getFocusedWindow();
  // 获取编辑器的内容
  const content = await window.webContents.executeJavaScript("editor.value()");
  // 打开保存文件的对话框
  const file = dialog.showSaveDialogSync(window, {
    title: "保存 Markdown 文件",
    defaultPath: app.getPath("documents"),
    filters: [{ name: "Markdown", extensions: ["md", "markdown", "txt"] }],
  });
  if (!file) return;
  // 使用 fs 模块保存文件
  fs.writeFileSync(file, content);
}

const menuArr = [
  {
    label: "",
  },
  {
    label: "文件",
    submenu: [
      {
        label: "打开",
        accelerator: "CommandOrControl+O",
        click() {
          loadFile();
        },
      },
      {
        label: "保存",
        accelerator: "CommandOrControl+S",
        click() {
          saveFile();
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      { label: "撤销", role: "undo" },
      { label: "重做", role: "redo" },
      { type: "separator" },
      { label: "剪切", role: "cut" },
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" },
      { label: "全选", role: "selectall" },
    ],
  },
  {
    label: "格式化",
    submenu: [
      {
        label: "加粗",
        accelerator: "CommandOrControl+B",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-bold");
        },
      },
      {
        label: "斜体",
        accelerator: "CommandOrControl+I",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-bold");
        },
      },
      { type: "separator" },
      {
        label: "标题",
        submenu: [
          {
            label: "一级标题",
            accelerator: "CommandOrControl+1",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelOne");
            },
          },
          {
            label: "二级标题",
            accelerator: "CommandOrControl+2",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelTwo");
            },
          },
          {
            label: "三级标题",
            accelerator: "CommandOrControl+3",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelThree");
            },
          },
          {
            label: "四级标题",
            accelerator: "CommandOrControl+4",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelFour");
            },
          },
          {
            label: "五级标题",
            accelerator: "CommandOrControl+5",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelFive");
            },
          },
          {
            label: "六级标题",
            accelerator: "CommandOrControl+6",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelSix");
            },
          },
        ],
      },
      { type: "separator" },
      {
        label: "有序列表",
        accelerator: "CommandOrControl+O",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-ordered-list");
        },
      },
      {
        label: "无序列表",
        accelerator: "CommandOrControl+L",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-unordered-list");
        },
      },
      {
        label: "引用",
        accelerator: "CommandOrControl+-",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-quote");
        },
      },
      {
        label: "链接",
        accelerator: "CommandOrControl+K",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-link");
        },
      },
      {
        label: "代码块",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-code");
        },
      },
    ],
  },
  {
    role: "帮助",
    submenu: [
      {
        label: "有关编辑器",
        click() {},
      },
    ],
  },
];

if (process.env.NODE_ENV === "development") {
  menuArr.push({
    label: "开发者",
    submenu: [
      {
        label: "开发者工具",
        role: "toggleDevTools",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
      },
      { type: "separator" },
      {
        label: "重新加载",
        role: "reload",
        accelerator: "Command+R",
      },
    ],
  });
}

console.log(app.getName(),'asd');

if (process.platform === "darwin") {
  menuArr.unshift({
    label: app.getName(),
    submenu: [
      {
        label: "关于编辑器",
        role: "about",
      },
      { type: "separator" },
      {
        label: "退出编辑器",
        role: "quit",
      },
    ],
  });
}

const menu = Menu.buildFromTemplate(menuArr);
Menu.setApplicationMenu(menu);
