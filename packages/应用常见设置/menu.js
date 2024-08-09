// 做我们的自定义菜单
const { Menu } = require("electron");

// 定义我们的自定义菜单
const menuArr = [
  {
    label: "",
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
    label: "菜单1",
    submenu: [
      {
        label: "菜单1-1",
      },
      {
        label: "菜单1-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单1-2");
        },
      },
    ],
  },
  {
    label: "菜单2",
    submenu: [
      {
        label: "菜单2-1",
      },
      {
        label: "菜单2-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单2-2");
        },
      },
    ],
  },
  {
    label: "菜单3",
    submenu: [
      {
        label: "菜单3-1",
      },
      {
        label: "菜单3-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单3-2");
        },
      },
    ],
  },
  {
    label: "开发者工具",
    submenu: [
      {
        label: "切换开发者工具",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(_, focusedWindow) {
          if (focusedWindow) focusedWindow.toggleDevTools();
        },
      },
    ],
  },
];

// 创建菜单
const menu = Menu.buildFromTemplate(menuArr);
// 设置菜单，让我们的自定义菜单生效
Menu.setApplicationMenu(menu);
