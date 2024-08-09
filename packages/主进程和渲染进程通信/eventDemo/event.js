const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();

// 监听自定义事件
event.on("some_event", () => {
  console.log("事件已触发");
});

module.exports = event;
