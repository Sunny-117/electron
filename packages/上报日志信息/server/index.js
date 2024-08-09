const express = require("express");
const http = require("http");
const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");

// 1. 创建一个 http 服务器
const app = express();
const server = http.createServer(app);

// 2. 确定上传的文件，存储的位置
const logPath = path.join(__dirname, "logs");
mkdirp.sync(logPath);

// 3. 配置和上传文件相关的接口
// 对于上传进行配置
const storage = multer.diskStorage({
  // 对文件的存储位置进行配置
  destination: function (req, file, cb) {
    // 第一个参数是错误信息，第二个参数是文件存储的位置
    cb(null, logPath);
  },
  // 对文件的存储名字进行配置
  filename: function (req, file, cb) {
    // 第一个参数是错误信息，第二个参数是文件名
    cb(null, file.originalname);
  },
});

// 前面表示使用 storage 配置
// 后面的 single 表示只上传一个文件
const upload = multer({ storage: storage }).single("file");

// 定义上传接口
app.post("/api/uploadlog", upload, (req, res) => {
  // 回头用户上传的文件就会被 upload 函数处理
  // 结束请求
  res.end();
});

// 4. 启动该服务器
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
