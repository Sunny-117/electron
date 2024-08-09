const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// 读取 index.html 文件
const html = fs.readFileSync(
  path.resolve(__dirname, "../window/index.html"),
  "utf8"
);

// 描述一组测试
describe("测试待办事项", () => {
  // 在这个回调函数中，我们就可以编写一组测试用例

  // beforeEach会在每个测试用例执行之前执行
  beforeEach(() => {
    // 根据 html 字符串创建一个 JSDOM 实例对象
    const dom = new JSDOM(html);
    // 将 document 和 window 挂载到全局环境中
    // 这样子可以在测试中像在浏览器里面一样直接使用 document 和 window
    global.document = dom.window.document;
    global.window = dom.window;
    // 引入 index.js 文件，为了测试 index.js 中的代码
    require("../window/index");
  });

  // afterEach会在每个测试用例执行之后执行
  // 一般会进行一些资源的释放操作、清除工作
  afterEach(() => {
    global.document = null;
    global.window = null;

    // 清除之前的 require 缓存，这样每一次测试都重新加载 index.js
    delete require.cache[require.resolve("../window/index")];
  });

  // 准备工作做好了之后，接下来就开始书写一个一个的测试用例
  // it 用来描述一个测试用例
  it("测试添加新的待办事项", async () => {
    // 输入框 DOM 元素
    const todoInput = document.getElementById("todoInput");
    // 添加按钮 DOM 元素
    const addTodoBtn = document.getElementById("addTodoBtn");
    // 获取待办事项列表
    const todoList = document.getElementById("todoList");

    // 输入框模拟输入的内容
    todoInput.value = "学习单元测试";
    // 点击添加按钮
    addTodoBtn.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 接下来就是进行断言
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toContain("学习单元测试");
  });

  // 测试删除待办事项
  it("测试删除待办事项", async () => {
    // 输入框 DOM 元素
    const todoInput = document.getElementById("todoInput");
    // 添加按钮 DOM 元素
    const addTodoBtn = document.getElementById("addTodoBtn");
    // 获取待办事项列表
    const todoList = document.getElementById("todoList");

    // 我们先添加一个待办事项
    // 输入框模拟输入的内容
    todoInput.value = "学习单元测试";
    // 点击添加按钮
    addTodoBtn.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 进行断言
    expect(todoList.children.length).toBe(1);

    // 接下来我们再来做删除操作
    const deleteBtn = document.querySelector(".deleteBtn");
    deleteBtn.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 接下来进行断言
    expect(todoList.children.length).toBe(0);
  });

  // 测试编辑待办事项
  it("测试编辑待办事项", async () => {
    // 输入框 DOM 元素
    const todoInput = document.getElementById("todoInput");
    // 添加按钮 DOM 元素
    const addTodoBtn = document.getElementById("addTodoBtn");
    // 获取待办事项列表
    const todoList = document.getElementById("todoList");

    // 我们先添加一个待办事项
    // 输入框模拟输入的内容
    todoInput.value = "学习单元测试";
    // 点击添加按钮
    addTodoBtn.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 获取编辑按钮
    const editBtn = document.querySelector(".editBtn");
    // 点击编辑按钮
    editBtn.click();

    // 编辑框出现
    const customPrompt = document.getElementById("customPrompt");
    // 进行断言
    expect(customPrompt.style.display).toBe("block");

    // 进行修改
    const customPromptInput = document.getElementById("customPromptInput");
    const customPromptOk = document.getElementById("customPromptOk");
    customPromptInput.value = "新年快乐";
    customPromptOk.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 接下来就可以进行断言了
    expect(todoList.children[0].textContent).toContain("新年快乐");
  });

  // 测试取消编辑待办事项
  it("测试取消编辑待办事项", async () => {
    // 输入框 DOM 元素
    const todoInput = document.getElementById("todoInput");
    // 添加按钮 DOM 元素
    const addTodoBtn = document.getElementById("addTodoBtn");
    // 获取待办事项列表
    const todoList = document.getElementById("todoList");

    // 我们先添加一个待办事项
    // 输入框模拟输入的内容
    todoInput.value = "学习单元测试";
    // 点击添加按钮
    addTodoBtn.click();

    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 获取编辑按钮
    const editBtn = document.querySelector(".editBtn");
    // 点击编辑按钮
    editBtn.click();

    // 编辑框出现
    const customPrompt = document.getElementById("customPrompt");
    // 进行断言
    expect(customPrompt.style.display).toBe("block");

    // 获取取消按钮
    const customPromptCancel = document.getElementById("customPromptCancel");
    customPromptCancel.click();
    // 等待异步 DOM 更新完成
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 接下来就可以进行断言了
    expect(todoList.children[0].textContent).toContain("学习单元测试");
  });
});
