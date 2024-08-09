// 先获取 DOM 元素
const buttons = document.querySelector(".buttons");
const btn = document.querySelectorAll("span"); // 获取到所有的按钮
const value = document.querySelector("#value"); // 获取到显示结果的元素
const toggleBtn = document.querySelector("#toggleBtn"); // 获取到切换按钮

// 我们需要给每一个按钮绑定事件
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", () => {
    // 接下来我们就需要根据按钮（span）里面的值来做不同的事情
    if (btn[i].innerHTML === "=") {
      // 说明用户要计算结果了
      value.innerHTML = calc(value.innerHTML);
    } else if (btn[i].innerHTML === "Clear") {
      // 清屏
      value.innerHTML = "";
    } else if (btn[i].innerHTML === "Theme") {
      // 切换主题
      document.body.classList.toggle("dark");
    } else {
      // 用户点击的是数字或者运算符，将其拼接到上方的显示屏上面
      value.innerHTML += btn[i].innerHTML;
    }
  });
}

/**
 *
 * @param {*} expression 这个是一个字符串
 * "89-56"
 * "1000*2"
 * "1+100"
 * @returns {Array} 返回一个数组，数组里面包含了操作数和运算符
 * ["89", "-", "56"]
 */
function extractExpression(expression) {
  // 这里我们可以使用正则表达式来提取操作数和运算符
  const regex = /(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/;
  const matches = expression.match(regex);

  if (matches && matches.length === 4) {
    // matches[0] 是整个表达式
    // matches[1] 是第一个操作数
    // matches[2] 是运算符
    // matches[3] 是第二个操作数
    return [matches[1], matches[2], matches[3]];
  } else {
    return [];
  }
}

/**
 *
 * @param {*} expression 这个是一个字符串
 * "89-56"
 * "1000*2"
 * "1+100"
 */
function calc(expression) {
  // 拿到这个表达式，我们首先要做的第一步就是将操作数和运算符分离出来
  const parts = extractExpression(expression);
  const a = parts[0];
  const operator = parts[1];
  const b = parts[2];
  switch (operator) {
    case "+":
      return Number(a) + Number(b);
    case "-":
      return Number(a) - Number(b);
    case "*":
      return Number(a) * Number(b);
    case "/":
      return Number(a) / Number(b);
    default:
      return "Error";
  }
}
