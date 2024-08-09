const os = require("os");
// console.log(os.cpus());

function getCpu() {
  const cpus = os.cpus();
  if (cpus.length > 0) {
    return cpus[0].model;
  } else {
    return "unknown";
  }
}

// 关于内存的获取
// 我们需要将拿到的字节数转换为相应的 XXX G 单位
// console.log(os.freemem());
// console.log(os.totalmem());

function convert(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + "GB";
}

document.querySelector("#cpu span:last-child").innerHTML = getCpu();
document.querySelector("#cpu-arch span:last-child").innerHTML = os.arch();
document.querySelector("#platform span:last-child").innerHTML = os.platform();
document.querySelector("#freemem span:last-child").innerHTML = convert(
  os.freemem()
);
document.querySelector("#totalmem span:last-child").innerHTML = convert(
  os.totalmem()
);
