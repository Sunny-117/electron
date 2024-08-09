const { PeerServer } = require("peer");
// 启动中继服务器
PeerServer({
  port: 9000,
  path: "/webrtc",
});
console.log("中继服务器已经启动...");
