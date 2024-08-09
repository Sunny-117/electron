const SimpleMDE = require("../node_modules/simplemde/dist/simplemde.min.js");
const { ipcRenderer } = require("electron");

// 实例化 Markdown 编辑器
const editor = new SimpleMDE({
  element: document.getElementById("editor"),
});

ipcRenderer.on("load", (_, content) => {
  if (content) {
    editor.value(content);
  }
});

// 各种格式化事件
ipcRenderer.on("format", (_, arg) => {
  switch (arg) {
    case "toggle-bold": {
      editor.toggleBold();
      break;
    }
    case "toggle-italic": {
      editor.toggleItalic();
      break;
    }
    case "titleLevelOne": {
      editor.toggleHeading1();
      break;
    }
    case "titleLevelTwo": {
      editor.toggleHeading2();
      break;
    }
    case "titleLevelThree": {
      editor.toggleHeading3();
      break;
    }
    case "titleLevelFour": {
      editor.toggleHeading4();
      break;
    }
    case "titleLevelFive": {
      editor.toggleHeading5();
      break;
    }
    case "titleLevelSix": {
      editor.toggleHeading6();
      break;
    }
    case "toggle-ordered-list": {
      editor.toggleOrderedList();
      break;
    }
    case "toggle-unordered-list": {
      editor.toggleUnorderedList();
      break;
    }
    case "toggle-code": {
      editor.toggleCodeBlock();
      break;
    }
    case "toggle-quote": {
      editor.toggleBlockquote();
      break;
    }
    case "toggle-link": {
      editor.drawLink();
      break;
    }
  }
});

// 实现拖拽功能
const body = document.querySelector("body");
// 绑定 drop 事件，实现拖拽打开文件
body.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // 检查拖放的数据是否包含文件项
  if (e.dataTransfer.items) {
    // 遍历拖放的每个项
    for (let item of e.dataTransfer.items) {
      // 检查项的类型是否是文件
      if (item.kind === "file") {
        let file = item.getAsFile();

        // 使用 FileReader 读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
          // 文件读取完成后，将内容设置到编辑器中
          editor.value(e.target.result);
        };
        // 以文本格式读取文件
        reader.readAsText(file);
      }
    }
  }
});
body.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
