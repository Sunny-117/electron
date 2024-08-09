// 1. 启动一个 Worker，单独启动一个 Worker，可以做一些比较耗时的操作
// 2. 然后我们使用 MessageChannel 与 Worker 进行通信

document.getElementById("sendMessage").addEventListener("click", () => {
  // 1. 初始化一个 Worker
  const worker = new Worker("worker.js");

  // 2. 创建一个 messagechannel
  // 创建了一个 MessageChannel 对象，然后我们可以通过它的 port1 和 port2 属性来进行通信
  // 我们这个 main.js 上下文要留一个 prot，然后把另一个 port 传递给 Worker
  const channel = new MessageChannel();

  // 监听来自 Worker 发过来的消息
  channel.port1.onmessage = (event) => {
    document.getElementById(
      "data-display"
    ).textContent = `从 Worker 接收到的数据：${event.data}`;
  };

  // 这里就将 port2 传递给 Worker
  worker.postMessage("Hello World", [channel.port2]);
});
