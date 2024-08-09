const addTodoBtn = document.getElementById("addTodoBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const customPrompt = document.getElementById("customPrompt");
const customPromptInput = document.getElementById("customPromptInput");
const customPromptOk = document.getElementById("customPromptOk");
const customPromptCancel = document.getElementById("customPromptCancel");
let editingTodo = null;

// 添加任务
addTodoBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <div>
                <button class="deleteBtn">删除</button>
                <button class="editBtn">编辑</button>
            </div>
            `;
    todoList.appendChild(li);
    todoInput.value = "";
  }
});

// 删除和编辑任务
todoList.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const todoItem = clickedElement.closest("li");

  if (clickedElement.className === "deleteBtn") {
    todoList.removeChild(todoItem);
  } else if (clickedElement.className === "editBtn") {
    editingTodo = todoItem;
    customPromptInput.value =
      editingTodo.querySelector(".todo-text").textContent;
    customPrompt.style.display = "block";
  }
});

// 更新任务
customPromptOk.addEventListener("click", () => {
  if (editingTodo) {
    const updatedText = customPromptInput.value.trim();
    if (updatedText) {
      editingTodo.querySelector(".todo-text").textContent = updatedText;
      customPrompt.style.display = "none";
      editingTodo = null;
    }
  }
});

// 取消更新
customPromptCancel.addEventListener("click", () => {
  customPrompt.style.display = "none";
  editingTodo = null;
});
