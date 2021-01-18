module.exports = app => {
  const todos = require("../controllers/todo.controller");

  const router = require("express").Router();

  // 创建并保存Todo
  router.post("/", todos.create);

  // 按条件查找所有Todo信息
  router.get("/", todos.findAll);

/*  // 查找指定id的Todo信息
  router.get("/", todos.findOne);*/

  // 更新指定id的Todo信息
  router.put("/", todos.update);

  // 删除指定id的Todo信息
  router.delete("/", todos.delete);

/*  // 删除所有Todo
  router.delete("/", todos.deleteAll);*/

  app.use('/todo', router);
};
