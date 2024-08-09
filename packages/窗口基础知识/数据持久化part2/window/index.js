const themeColor = document.getElementById("themeColor");
const fontSize = document.getElementById("fontSize");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const textInput = document.getElementById("textInput");

// 存储用户偏好
saveBtn.addEventListener("click", () => {
  localStorage.setItem("themeColor", themeColor.value);
  localStorage.setItem("fontSize", fontSize.value);
  updateUserApperance(themeColor.value, fontSize.value);
});

// 加载用户偏好
loadBtn.addEventListener("click", () => {
  // 1. 从本地localStorage取出用户偏好
  const color = localStorage.getItem("themeColor");
  const size = localStorage.getItem("fontSize");
  // 2. 应用取出的用户偏好
  if (color && size) {
    themeColor.value = color;
    fontSize.value = size;
    updateUserApperance(color, size);
    alert("加载用户偏好成功");
  } else {
    alert("您还没有保存过用户偏好");
  }
});

function updateUserApperance(themeColor, fontSize) {
  textInput.style.color = themeColor;
  textInput.style.fontSize = fontSize + "px";
}
