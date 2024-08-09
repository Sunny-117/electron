self.onmessage = (event) => {
  // 拿到主线程给我传递过来的 port2
  const port = event.ports[0];

  if (port) {
    // 我们就使用这个 port 不停的给主线程发送消息
    setInterval(() => {
      // 生成一个随机的数据传递给主线程
      port.postMessage(Math.random());
    }, 1000);
  }
};
