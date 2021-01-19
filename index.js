const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
  // 创建Todo
  for (let i = 1; i <= 10; i++) {
    TodoController.createTodo('test'+i,'This is todo'+i);
  }
}
