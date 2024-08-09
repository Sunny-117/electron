const { ipcRenderer } = require("electron");
const { drawCanvas, clearCanvas } = require("./canvas");
drawCanvas();
ipcRenderer.on("begin-capture", async () => {
  // 首先第一步，需要获取到屏幕的截图
  // 关于屏幕的截图，仍然是主进程才能做
  const thumbnail = await ipcRenderer.invoke("get-source");
  // 我们首先获取缩略图的宽高，因为这个宽高决定了 canvas 的宽高
  const { width, height } = thumbnail.getSize();
  // 创建一个 image 图像，用于放置缩略图
  const image = new Image();
  image.src = thumbnail.toDataURL();
  image.onload = () => {
    // 该事件会在图像准备好的时候触发
    // 接下来我们需要将该图像写入到 canvas 里面
    const c = document.getElementById("screen-shot");
    const ctx = c.getContext("2d");
    c.width = width;
    c.height = height;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0);
    // 图像已经绘制到了 canvas 上面，接下来请求主进程显示窗口
    ipcRenderer.send("show-window", { width, height });
  };
});

document.getElementById("save-btn").addEventListener("click", () => {
  // 保存截图涉及到了文件的读写，仍然是主进程来做
  const c = document.getElementById("screen-shot");
  const dataURL = c.toDataURL(); // 将 canvas 转换为 base64 编码的 URL
  ipcRenderer.send("save-pic", dataURL);
});

document.getElementById("close-btn").addEventListener("click", () => {
  ipcRenderer.send("close-window");
  clearCanvas();
});
