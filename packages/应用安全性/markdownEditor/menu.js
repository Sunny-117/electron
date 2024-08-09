const { Menu, app, BrowserWindow, dialog } = require("electron");
const fs = require("fs");

// 加载 Markdown 文件
function loadFile() {
  // 获取到当前聚焦的窗口
  const window = BrowserWindow.getFocusedWindow();
  // 能够拿到用户所选择的 markdown 文件的绝对路径
  const files = dialog.showOpenDialogSync(window, {
    properties: ["openFile"],
    title: "请选择你要打开的 Markdown 文件",
    defaultPath: app.getPath("documents"),
    filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
  });
  if (files && files.length > 0) {
    const file = files[0]; // 拿到文件的路径
    const fileContent = fs.readFileSync(file).toString(); // 读取文件内容
    // 最后一步，将文件内容发送给渲染进程
    window.webContents.send("load", fileContent);
  }
}

// 保存 Markdown 文件
async function saveFile() {
  // 1. 获取用户在编辑器里面书写的内容
  const window = BrowserWindow.getFocusedWindow();
  // 获取编辑器的内容
  const content = await window.webContents.executeJavaScript("editor.value()");

  // 2. 打开保存文件的对话框
  // 用户能够选择保存的位置，以及文件的名字
  const filePath = dialog.showSaveDialogSync(window, {
    title: "保存 Markdown 文件",
    defaultPath: app.getPath("documents"),
    filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
  });
  // 3. 使用 fs 模块的写入文件来进行文件的保存
  if (!filePath) return;
  fs.writeFileSync(filePath, content);
}

// 自定义菜单栏
const menuArr = [
  {
    label: "",
  },
  {
    label: "文件",
    submenu: [
      {
        label: "打开",
        click() {
          loadFile();
        },
      },
      {
        label: "保存",
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
      { label: "全选", role: "selectAll" },
    ],
  },
  {
    label: "格式化",
    submenu: [
      {
        label: "加粗",
        accelerator: "CommandOrControl+B",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-bold");
        },
      },
      {
        label: "斜体",
        accelerator: "CommandOrControl+I",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-italic");
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
    role: "help",
    label: "帮助",
    submenu: [
      {
        label: "有关编辑器",
        click() {
          console.log("有关编辑器");
        },
      },
    ],
  },
];

// 根据当前的环境来决定是否添加开发者工具
if (process.env.NODE_ENV === "development") {
  menuArr.push({
    label: "开发者工具",
    submenu: [
      {
        label: "打开/关闭",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
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

// 得到 menu 实例
const menu = Menu.buildFromTemplate(menuArr);
// 设置菜单
Menu.setApplicationMenu(menu);
