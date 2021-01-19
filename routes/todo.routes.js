module.exports = app => {
  const todos = require("../controllers/todo.controller");

  const router = require("express").Router();

  // 创建并保存Todo
  router.put("/", todos.create);

  // 按条件查找所有Todo信息
  router.get("/list", todos.findAll);

  // 更新指定id的Todo信息
  router.post("/", todos.update);

  // 更新指定id的Todo信息
  router.post("/fav", todos.update);

  // 删除指定id的Todo信息
  router.delete("/", todos.delete);

  app.use('/todo', router);
};
