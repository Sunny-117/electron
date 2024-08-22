const { Menu, MenuItem } = require("electron");

// 创建一个上下文菜单的实例
const contextMenu = new Menu();
// 回头我们就可以往这个 Menu 实例里面添加菜单项（ MenuItem 的实例 ）
contextMenu.append(
  new MenuItem({
    label: "复制",
    role: "copy",
  })
);
contextMenu.append(
  new MenuItem({
    label: "粘贴",
    role: "paste",
  })
);
contextMenu.append(
  new MenuItem({
    label: "剪切",
    role: "cut",
  })
);
module.exports = contextMenu;
