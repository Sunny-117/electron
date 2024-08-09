const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  // 这里调用的是 preload.js 所保留的 API
  window.myAPI.write("test.txt", "你好呀，朋友👋");
});
