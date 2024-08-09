const { Peer } = require("peerjs");

// 创建一个新的 Peer 实例，用于连接中继服务器
// 第一个参数设置为 undefined，表示使用默认的 peerid，由中继服务器生成
const peer = new Peer(undefined, {
  // 指定连接到本地的 PeerJS 服务器
  host: "localhost",
  // 对应的端口号
  port: 9000,
  // 对应的路径
  path: "/webrtc",
});

let conn = null; // 存储连接对象

peer.on("open", (id) => {
  console.log("当前客户端的 peerid 为：", id);
  idDisplay.textContent = id;
});

peer.on("connection", (incomingConn) => {
  // 监听连接事件，当有对点连接到本地时，会触发该事件
  // 对点的连接对象会作为参数传入
  conn = incomingConn;
  handleConnectionStatus();
});

// 连接按钮逻辑
connectBtn.addEventListener("click", () => {
  // 判断是否填写了用户名
  if (!userName.value) {
    alert("请填写用户名");
    return;
  }
  // 获取对点的 peerid
  const otherPeerId = peerId.value;
  // 如果没有填写对点的 peerid，则提示用户
  if (!otherPeerId) {
    alert("请填写对点的 peerid");
    return;
  }
  // 连接对点
  conn = peer.connect(otherPeerId);
  // 处理连接不同的状态
  handleConnectionStatus();
});

// 断开连接按钮的逻辑
disconnectBtn.addEventListener("click", () => {
  if (conn) {
    // 关闭连接
    conn.close();
  }
});

// 发送消息按钮的逻辑
sendBtn.addEventListener("click", () => {
  if (!userName.value) {
    alert("请填写用户名");
    return;
  }
  if (!conn) {
    alert("请先连接对点");
    return;
  }
  const mess = messageDOM.value;
  if (!mess) {
    alert("请填写消息");
    return;
  }
  if (conn && conn.open) {
    // 可以发送消息
    const formattedMessage = `${userName.value}说: ${mess}`;
    // 调用该方法后，对点会收到消息
    conn.send(formattedMessage);
    // 将自己说的话在聊天框里面显示出来
    receivedMessagesDiv.innerHTML += `
        <div class='message sent'>You：${mess}</div>
    `;
    messageDOM.value = "";
    scrollMessageToBottom();
  } else {
    alert("连接已关闭");
  }
});

// 针对连接的打开和关闭状态做一些不同的事情
function handleConnectionStatus() {
  // 连接打开的时候
  conn.on("open", () => {
    statusDom.textContent = "已连接";
    connectBtn.disabled = true;
    disconnectBtn.disabled = false;
    // 除了按钮的状态要改变，按钮的样式也会有所不同
    updateBtnStyle();

    // 接收到消息的时候，会触发相应的回调函数
    conn.on("data", (data) => {
      // 将对方说的话，在聊天框里面显示出来
      receivedMessagesDiv.innerHTML += `
            <div class='message received'>${data}</div>
        `;
      scrollMessageToBottom();
    });
  });
  // 连接关闭的时候
  conn.on("close", () => {
    statusDom.textContent = "未连接";
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
    updateBtnStyle();
  });
}

// 该方法主要就是根据按钮的禁用状态来改变按钮的样式
function updateBtnStyle() {
  if (connectBtn.disabled) {
    connectBtn.classList.remove("btn-enabled");
    connectBtn.classList.add("btn-disabled");
  } else {
    connectBtn.classList.remove("btn-disabled");
    connectBtn.classList.add("btn-enabled");
  }

  if (disconnectBtn.disabled) {
    disconnectBtn.classList.remove("btn-enabled");
    disconnectBtn.classList.add("btn-disabled");
  } else {
    disconnectBtn.classList.remove("btn-disabled");
    disconnectBtn.classList.add("btn-enabled");
  }
}
// 初始化按钮的样式
updateBtnStyle();

function scrollMessageToBottom() {
  receivedMessagesDiv.scrollTo({
    top: receivedMessagesDiv.scrollHeight,
    behavior: "smooth", // 平滑滚动
  });
}
