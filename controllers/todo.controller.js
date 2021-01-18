const db = require("../models");
const Todos = db.todos;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: todos } = data;
  const currentPage = (page ? +page : 0) + 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, todos , totalPages, currentPage };
};

// 创建并保存一条Todo
exports.create = (req, res) => {
  console.log(req.body)
  if (!req.body.title) {
    res.status(400).send({
      isOk: 0,
      msg: "Todo‘s title can not be empty!"
    });
    return;
  }

  // 定义Todo信息
  const todo = {
    title: req.body.title,
    content: req.body.content
  };

  // 创建Todo
  Todos.create(todo)
    .then(data => {
      console.log(">> Created todo: " + JSON.stringify(todo, null, 4));
      res.send({
        isOk: 1,
        msg: ''
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todo."
      });
    });
};

// 查找所有
exports.findAll = (req, res) => {
  const { size, title, page } = req.query;

  if (page<1){
    res.status(202).send({
      message: "No such page, page >= 1"
    });
    return ;
  }

  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Todos.findAll({ where: condition})
    .then(todos => {
          const data = {
            isOk: 1,
            msg: '',
            data: todos
          }

        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        isOk: 0,
        msg: err.toString()
      });
    });
};

// 查找一个
exports.findOne = (req, res) => {
  const id = req.query.id;

  Todos.findByPk(id)
    .then(todo => {
      let data = {
        isOk: 1,
        msg: '',
        data: todo
      }

      if (!todo){
        data.isOk = 0
        data.msg = `No such Todo with id = ${id}`
        res.status(202).send(data);
      }

      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        isOk: 0,
        msg: "Error retrieving Todo with id=" + id
      });
    });
};

// 更新一个
exports.update = (req, res) => {
  const id = req.query.id;

  Todos.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      let data = {
        isOk: 1,
        msg: ''
      }

      if (num === 1 || num[0] === 1) { // 更新成功
        data.msg = "Todo was updated successfully."
      } else {
        data.msg = `Cannot update Todo with id=${id}. Maybe Todo was not found or req.title is empty!`
      }

      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        isOk: 0,
        msg: "Error retrieving Todo with id=" + id
      });
    });
};

// 删除一个
exports.delete = (req, res) => {
  const id = req.body.id;

  if (!id || id === 'all')
   this.deleteAll(req, res)
  else
  Todos.destroy({
    where: { id: id }
  })
    .then(num => {
      let data = {
        isOk: 1,
        msg: ''
      }
      console.log(num)
      if (num === 1 || num[0] === 1) { // 删除成功
        data.msg = "Todo was deleted successfully!";
      } else {
        data.isOk = 0;
        data.msg = `Todo delete Todo with id=${id}. Maybe Todo was not found!`;
      }

      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        isOk: 0,
        msg: "Could not delete Todo with id=" + id
      })
    });
};

// 删除所有
exports.deleteAll = (req, res) => {
  Todos.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        isOk: 1,
        msg: `${nums} Todos were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        isOk: 0,
        msg: err.message || "Some error occurred while removing all Todos."
      });
    });
};

// 创建评论
exports.createTodo = (title, content) => {
  return Todos.create({
    title: title,
    content: content,
  })
    .then((todo) => {
      console.log(">> Created todo: " + JSON.stringify(todo, null, 4));
      return todo;
    })
    .catch((err) => {
      console.log(">> Error while creating todo: ", err.toString());
    });
};
