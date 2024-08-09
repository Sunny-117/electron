const { ipcRenderer } = require("electron");

const uploadBtn = document.getElementById("upload-button");
const fileInput = document.getElementById("file-input");
const progressBar = document.getElementById("progress-bar");

uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (file) {
    // 进行上传操作，这里选择使用 xhr
    // 为了方便监听到上传的进度，这里使用了 xhr.upload.onprogress
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file, file.name);
    xhr.open("POST", "http://localhost:3000/upload", true);
    // 该事件就是监听上传进度的
    xhr.upload.onprogress = (e) => {
      // e.lengthComputable 是一个布尔值，表示是否可以获取长度
      // 当返回值为 true 的时候，说明有长度，那么也就说明有进度信息，这个时候可以通过 e.loaded 和 e.total 来计算进度
      // e.loaded 表示目前为止上传的字节数
      // e.total 表示总的字节数
      if (e.lengthComputable) {
        const progress = e.loaded / e.total;
        // 目前为止，进度信息就已经有了，最后我们需要在任务栏的应用图标下面显示这个进度
        ipcRenderer.send("uploadProgress", progress);

        // 设置页面上的进度条
        if (progress < 0) {
          progressBar.style.width = "0%";
        } else {
          progressBar.style.width = progress * 100 + "%";
        }
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 说明上传完毕了
        alert("上传操作已经完毕");
        // 重置进度条
        ipcRenderer.send("uploadProgress", -1);
      } else {
        console.error(xhr.status);
      }
    };

    xhr.send(formData);
  }
});

fileInput.addEventListener("change", () => {
  progressBar.style.width = "0%";
});
