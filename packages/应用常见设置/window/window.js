const { ipcRenderer, clipboard } = require("electron");

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

// 设置一个页面级别的快捷键
window.onkeydown = function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "q") {
    // 用户按的键是 ctrl + q
    // 我们可以执行对应的快捷键操作
    console.log("您按下了 ctrl + q 键");
  }
};

// 实现剪切板功能
const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
copyBtn.addEventListener("click", function () {
  // 往剪切板里面写入要复制的内容
  clipboard.writeText(copyText.textContent);
  window.alert("激活码复制成功！");
});

// 发送系统通知
const notifyBtn = document.getElementById("notifyBtn");
notifyBtn.addEventListener("click", function () {
  const option = {
    title: "您有一条新的消息，请及时查看",
    body: "这是一条测试消息，技术支持来源于 HTML5 的 notificationAPI",
  };
  const myNotify = new Notification(option.title, option);
  myNotify.onclick = function () {
    console.log("用户点击了通知");
  };
});
