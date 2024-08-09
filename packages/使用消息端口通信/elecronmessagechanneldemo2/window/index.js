const { ipcRenderer } = require("electron");

let port = null; // 存储主进程传递过来的端口
const dataDisplayDOM = document.getElementById("data-display");

// 渲染进程这边监听一个名为 deliver-port 的事件
// 回头主进程会发送这个事件，然后把端口传递过来
ipcRenderer.on("deliver-port", (event) => {
  // 这里拿到了主进程传递过来的端口，这意味两者之间可以通信了
  port = event.ports[0];

  port.onmessage = (event) => {
    dataDisplayDOM.textContent = event.data;
  };

  // 接下来我赶紧给主进程发送一个消息
  port.postMessage("start");
});

document.getElementById("startBtn").addEventListener("click", () => {
  // 现在端口的生产不是在渲染进程了，而是在主进程
  // 因此这里我们请求主进程把端口发过来
  ipcRenderer.postMessage("request-port", null, []);
});

document.getElementById("stopBtn").addEventListener("click", () => {
  port.close(); // 关闭端口
  dataDisplayDOM.textContent = "已停止";
  port = null;
});
