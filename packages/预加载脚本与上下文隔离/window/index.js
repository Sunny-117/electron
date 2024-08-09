// const { BrowserWindow } = require("@electron/remote");

// const btn = document.getElementById("btn");
// btn.addEventListener("click", () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//   });
//   win.loadURL("https://www.baidu.com");
// });

console.log(window.myAPI, "window.myAPI");

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // 打开文件
  const fd = window.myAPI.open("example.txt", "w");
  // 写入内容
  window.myAPI.write(fd, "This is a test");
});
