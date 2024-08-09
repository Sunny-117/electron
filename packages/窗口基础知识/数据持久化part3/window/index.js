// 获取相应的 DOM 元素
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const customPrompt = document.getElementById("customPrompt");
const customPromptInput = document.getElementById("customPromptInput");
const customPromptOk = document.getElementById("customPromptOk");
const customPromptCancel = document.getElementById("customPromptCancel");

// 接下来我们工作的重点，是在 IndexedDB 的操作上面
// 我们使用 dexie 来操作 indexedDB

const Dexie = require("dexie");
const db = new Dexie("todoDB"); // 创建数据库
// 接下来创建一张表
db.version(1).stores({
  todos: "++id, content",
});

// 修改待办事项
async function updateTodo(id, newContent) {
  await db.todos.update(id, { content: newContent });
  readTodos();
}

// 删除待办事项
async function deleteTodo(id) {
  await db.todos.delete(id);
  readTodos();
}

/**
 *
 * @param {*} li 当前待办事项对应的 li DOM 元素
 * @param {*} value 待办事项的值
 * @param {*} id 对应的 id
 */
function createTodoButtons(li, value, id) {
  // 创建更新按钮
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "更新";
  updateBtn.onclick = () => {
    // 显示自定义提示框
    showCustomPrompt(value, async (newContent) => {
      if (newContent) {
        await updateTodo(id, newContent);
      }
    });
  };

  // 创建删除按钮
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "删除";
  deleteBtn.onclick = async () => {
    await deleteTodo(id);
  };

  const div = document.createElement("div");
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);
}

// 读取待办事项并更新 UI
async function readTodos() {
  const allTodos = await db.todos.toArray();
  todoList.innerHTML = "";
  allTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.content;
    createTodoButtons(li, todo.content, todo.id);
    todoList.appendChild(li);
  });
}

readTodos();

// 增加待办事项
addTodoBtn.addEventListener("click", async () => {
  await db.todos.add({ content: todoInput.value });
  todoInput.value = "";
  readTodos();
});

// 显示自定义的提示框
function showCustomPrompt(text, callback) {
  customPromptInput.value = text;
  customPrompt.style.display = "block";

  customPromptOk.onclick = () => {
    callback(customPromptInput.value);
    customPrompt.style.display = "none";
  };

  customPromptCancel.onclick = () => {
    callback(null);
    customPrompt.style.display = "none";
  };
}
