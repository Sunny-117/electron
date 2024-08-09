const { ipcRenderer } = require("electron");
const { port1, port2 } = new MessageChannel();

// 接下来需要将 port2 传递给主进程
// 这里通过 IPC 来进行传递
/**
 * @param {string} channel 通道名，也就是说回头在主进程那边会监听这个名字的通道
 * @param {any} args 传递的参数，要传递给主进程的消息内容
 * @param {MessagePort[]} transferList 传递的 MessagePort 端口的数组
 */
ipcRenderer.postMessage("port", null, [port2]);

// 监听 port1 的消息
port1.onmessage = (event) => {
  console.log("主进程给我传递过来的信息为：", event.data);
};

document.getElementById("btn").addEventListener("click", () => {
  // 向主进程发消息
  port1.postMessage("Hello, World!");
});
