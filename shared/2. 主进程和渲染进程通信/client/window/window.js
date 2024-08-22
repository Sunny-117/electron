// 1. 首先我们要发送 http 请求来获取数据
// 2. 将获取到的数据发送给主进程

const http = require("http");
const { ipcRenderer } = require("electron");

// 配置 http 请求
const options = {
  hostname: "127.0.0.1",
  port: 3000,
  path: "/users",
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// 获取 button 的 DOM 节点
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // 下面的 http.request() 只是创建一个 http 请求
  const req = http.request(options, (res) => {
    // 设置响应的编码格式
    res.setEncoding("utf8");
    res.on("data", (data) => {
      // 拿到数据之后，就需要将这个数据发送给主进程
      ipcRenderer.send("test", data);
    });
  });
  // 发送 http 请求
  req.write("");
  // 请求结束
  req.end();
});

ipcRenderer.on("data-res", (event, data) => {
  console.log("收到回复，主进程回复的消息为：", data);
});
