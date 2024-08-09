// 该文件主要提供一个 canvas 的绘制功能，用于绘制屏幕截图
const canvas = document.getElementById("screen-shot");
const ctx = canvas.getContext("2d");

/**
 * 绘制方法
 */
function drawCanvas() {
  canvas.onmousedown = (event) => {
    ctx.beginPath();
    ctx.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    document.onmousemove = (ev) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
      ctx.stroke();
    };
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
}

/**
 * 清除画布
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

module.exports = {
  drawCanvas,
  clearCanvas,
};
