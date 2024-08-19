// 获取 DOM 节点
const button = document.querySelector('.button')
const message = document.querySelector('.message')
// 监听用户点击事件
button.addEventListener('click', async () => {
  // 修改 DOM 的内容
  message.innerHTML = '大家好，快来黑马学编程...'

  console.log(window.electronAPI.getVersions())

  // 获取主进程处理的结果
  const result = await window.electronAPI.sendMessage('测试消息发送...')
  // console.log(result)
})
