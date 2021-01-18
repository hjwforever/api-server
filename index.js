const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const key = require("./config/auth.config")
const db = require("./config/db/mysql.config")

console.log(key)
console.log(db)
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("./models");
const Role = mysql.role;
const TodoController = require("./controllers/todo.controller")

mysql.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial().then(r => console.log("Initial successfully."));
});

// 路由
require("./routes/todo.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.send(`Welcome to the api server of hjwforevr's projects.  <a href="https://github.com/hjwforever/api-server">Github</a>`)
  // res.json({ message: "Welcome to the server of ali_lesson_react_demo.", github: "https://github/hjwforever" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// 初始化
async function initial() {
  // 创建角色
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });

  // 创建用户
  mysql.user.create({
    id: 1,
    username: 'test',
    avatar: 'https://s3.ax1x.com/2021/01/04/sit7zn.jpg', // https://image.aruoxi.com/webmall/avatar/10.jpg
    email: 'test@qq.com',
    password: '$2a$08$mGafV9KFEtL1mwnRUC29eOVKp7mmemiz6VDIZa9bOqyEusRK9hDpa',
  });

  mysql.user.create({
    id: 2,
    username: 'admin',
    avatar: ' https://image.aruoxi.com/webmall/avatar/10.jpg',
    email: 'admin@webmall.com',
    password: '$08$uu.2FvsiR4F16iQoSmCK9ubhuGihOEfxK47XF/i2KKKre7Ec8oRFm',
  });

  // 创建Todo
  TodoController.createTodo('test','This is todo');
}
