// 为了让 electron 将不同进程桥接，才有了 preload


// 此文件中可使用所有nodejs API，将 require 拓展到 window 上
window.require = require