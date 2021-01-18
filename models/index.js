const dbConfig = require("../config/db/mysql.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  logging: false,
  timezone: '+08:00',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },


  define: {
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    underscored: true
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,

  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 设置角色类型
db.ROLES = ["user", "admin"];

// 用户和角色
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

// todos
db.todos = require("./todo.model")(sequelize, Sequelize);

// 图片
db.images = require("./image.model.js")(sequelize, Sequelize);

// 用户和角色 多对多关系
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

module.exports = db;
