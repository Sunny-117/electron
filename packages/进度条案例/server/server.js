const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());

// 上传到一个名为 uploads 的目录
// 首先第一步就需要检查服务器下面有没有这个目录，没有就创建
const uploadsDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  // 如果没有，那么会进入该分支
  fs.mkdirSync(uploadsDir);
}

// 通过 multer 中间件来处理文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // 获取到文件的扩展名
    const ext = path.extname(file.originalname);
    // 接下来再来获取文件名
    const basename = path.basename(file.originalname, ext);
    // 为了防止文件重名，我们给文件名加上时间戳
    const timestamp = Date.now();
    // 构建新的文件名
    const filename = `${basename}-${timestamp}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// 设置文件上传的路由
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("文件上传成功");
});

app.listen(3000, () => {
  console.log("服务器已经启动，监听 3000 端口...");
});
