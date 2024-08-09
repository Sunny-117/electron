const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");

btn.addEventListener("click", async function () {
  // 我们需要弹出一个对话框
  const result = await ipcRenderer.invoke("show-open-dialog");
  console.log(result);
});

const menu = document.getElementById("menu");
// 点击右键时对应的事件
window.oncontextmenu = function (e) {
  e.preventDefault();
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  menu.style.display = "block";
};

// 用户点击右键菜单上面的某一项的时候
// 注意下面的查询 DOM 的方式只会获取到第一个匹配的元素
// 因此右键菜单上面的功能只会绑定到第一个菜单项上面
document.querySelector(".menu").onclick = function () {
  console.log("这是右键菜单上面的某一个功能");
};

// 当用户点击窗口的其他地方的时候，右键菜单应该消失
window.onclick = function () {
  menu.style.display = "none";
};
