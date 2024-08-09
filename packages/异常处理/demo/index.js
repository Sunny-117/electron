const invalidJSON = "{name: 'Front-End Wizard', age: 25;}";
try {
  JSON.parse(invalidJSON);
} catch (e) {
  console.error("解析 JSON 时发生错误：", e.message);
}
console.log("后续代码...");
