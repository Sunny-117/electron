const { ipcRenderer } = require("electron");
const deg = 6; // 角度值
// 获取 DOM 元素
const clock = document.querySelector("#clock");
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

setInterval(() => {
  const timeStamp = new Date(); // 获取当前的时间戳

  // 根据时间戳来计算出相应的旋转角度
  const h = timeStamp.getHours() * 30; // 一圈 360 度，12 小时，所以每小时 30 度
  const m = timeStamp.getMinutes() * deg; // 一圈 360 度，60 分钟，所以每一格 6 度，所以每分钟 6 度
  const s = timeStamp.getSeconds() * deg; // 一圈 360 度，60 秒，所以每一格 6 度，所以每秒 6 度

  // 最后就是进行相应的旋转
  hour.style.transform = `rotateZ(${h + m / 12}deg)`; // 在旋转始终的时候，还需要添加上分钟的角度
  min.style.transform = `rotateZ(${m}deg)`; // 分钟的旋转
  sec.style.transform = `rotateZ(${s}deg)`; // 秒的旋转
}, 1000);

let offset = null; // 记录用户拖拽的偏移值
// 解决时钟挂件拖拽移动的问题
document.addEventListener("mousedown", (e) => {
  // 如果用户点击的是 .clock 元素或者 .clock 元素的子元素
  if (e.target.matches(".clock, .clock *")) {
    window.isDragging = true; // 设置一个开关，表示用户正在拖拽
    offset = {
      x: e.screenX - window.screenX,
      y: e.screenY - window.screenY,
    };
  }
});

document.addEventListener("mousemove", (e) => {
  if (window.isDragging) {
    const { screenX, screenY } = e; // 从最新的鼠标位置获取 x 和 y
    window.moveTo(screenX - offset.x, screenY - offset.y);
  }
});

document.addEventListener("mouseup", () => {
  window.isDragging = false; // 用户停止拖拽
  offset = null; // 重置偏移值
});

clock.addEventListener("mouseenter", () => {
  // 在鼠标进入到时钟区域的时候，我们要解除鼠标穿透
  ipcRenderer.send("setIgnoreMouseEvent", false);
});

clock.addEventListener("mouseleave", () => {
  // 在鼠标离开时钟区域的时候，我们要重新开启鼠标穿透
  ipcRenderer.send("setIgnoreMouseEvent", true, { forward: true });
});
