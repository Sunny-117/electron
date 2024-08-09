const { ipcRenderer } = require("electron");

const createGroup1WindowBtn = document.getElementById("createGroup1WindowBtn");
const createGroup2WindowBtn = document.getElementById("createGroup2WindowBtn");

// 创建属于分组1的窗口
createGroup1WindowBtn.addEventListener("click", () => {
  ipcRenderer.send("create-window", {
    name: `win1-${Date.now()}`,
    group: "group1",
    width: 400,
    height: 300,
    file: "window2/index.html",
  });
});

// 创建属于分组2的窗口
createGroup2WindowBtn.addEventListener("click", () => {
  ipcRenderer.send("create-window", {
    name: `win1-${Date.now()}`,
    group: "group2",
    width: 400,
    height: 300,
    file: "window2/index.html",
  });
});
